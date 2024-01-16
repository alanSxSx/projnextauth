import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
		name:'credentials',
		credentials:{
		cpf:{label: 'cpf', type:'text'},
		senha:{label: 'password', type:'text'}
		},

		async authorize(credentials,req){
			const response = await fetch('http://localhost:8080/login', {
			method:'POST',
			headers: {
				'Content-type':'application/json'
			},
			body: JSON.stringify({
				cpf:credentials?.cpf,
				senha:credentials?.senha
			})
		})

		const user = await response.json()

		if(user && response.ok){
			return user
		}

		return null

		}

		})

	],
	pages: {
		signIn:'/'
	},

	callbacks: {
		async jwt({token, user}) {
			user && (token.user = user)
			return token
		},
		async session({session,token}) {
			const newSession  = token.user as any
			return newSession 
		}
	}


}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }

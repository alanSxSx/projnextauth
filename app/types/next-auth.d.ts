import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface Session {
		userData: {
			id:string
			cpf:string
			name:string
			tipo:string

		}
	}

}

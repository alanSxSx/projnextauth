import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface UserData {
  id: string;
  cpf: string;
  name: string;
  tipo: string;
}

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        senha: { label: 'password', type: 'text' }
      },

      async authorize(credentials, req) {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            email: credentials?.email,
            senha: credentials?.senha
          })
        });

        const user = await response.json();

        if (user?.token) {
          return {
            id: user.id,
            cpf: user.cpf,
            name: user.name,
            tipo: user.tipo,
            token: user.token
          };
        }

        return null;
      }
    })
  ],

  pages: {
    signIn: '/'
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      if (token.user) {
        // Agora você está adicionando userData ao session com o tipo correto
        session.userData = token.user as UserData;
      }
      return session;
    }
  }
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };

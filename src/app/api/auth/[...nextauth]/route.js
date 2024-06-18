import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const response = JSON.parse(credentials.response);
        const user = response.data;
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  session: {
    maxAge: 60 * 60 * 12, // 1 days
  },
  callbacks: {
    async session({ session, token }) {
      session.jwt = token.jwt;
      session.id = token.id;
      session.user = token.user;
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger == "update") {
        token.user = session.user;
      }
      if (user) {
        token.jwt = user.access_token;
        token.id = user.refresh_token;
        token.user = user;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

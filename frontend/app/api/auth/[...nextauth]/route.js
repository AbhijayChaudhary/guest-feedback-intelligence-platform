import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// NextAuth configuration options
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Store OAuth access token or provider details in JWT token if available
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      // Append token properties to session to expose them to client hooks
      if (session.user) {
        session.accessToken = token.accessToken;
        session.provider = token.provider;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

// Export handler for App Router dynamic API routes
export { handler as GET, handler as POST };

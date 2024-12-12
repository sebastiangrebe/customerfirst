import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabase } from '@/lib/supabase';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Authenticate with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });
        console.log(data);

        if (data.user) {
          return {
            id: data.user.id,
            email: data.user.email,
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
          };
        }
        return null;
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/',
    error: '/',
  },
  callbacks: {
    async jwt({ token, account, user }: any) {
        // Include access token when user signs in
        if (user?.accessToken) {
            token.accessToken = user.accessToken;
            token.refreshToken = user.refreshToken;
        }
        return token;
    },
    async session({ session, token }: any) {
        // Pass the access token to the session
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;

        return session;
    },
  },
});

export { handler as GET, handler as POST };
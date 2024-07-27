import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const { phoneNumber, password } = credentials as { phoneNumber: string, password: string };
        console.log("this is user no", phoneNumber);

        if (!phoneNumber || !password) {
          throw new Error('Phone number and password are required');
        }

        const user = await prisma.user.findUnique({
          where: { phoneNumber },
        });

        if (!user) {
          throw new Error("User not found.");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error("Incorrect password");
        }

        const { password: abc, ...rest } = user

        return rest;
      }
    }),
  ],

  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token as any;
      }
      return session;
    }
  },

  secret: process.env.NEXTAUTH_SECRET,
});


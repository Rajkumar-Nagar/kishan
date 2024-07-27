import NextAuth, { type DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      address: string,
      phoneNumber: string,
      backgroundImage: string | null,
      avatar: string | null,
    } & DefaultSession["user"]
  }
}
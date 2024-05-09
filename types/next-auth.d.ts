import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string,
      email: string,
      expList: Array<string>
    } & DefaultSession["user"]
  }
}
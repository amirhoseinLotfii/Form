// types/next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    refresh_token?: string;
    user: {
      email?: string;
      image?: string;
      id: string;
    };
  }

  interface JWT {
    refresh_token?: string;
    image?: string;
  }
}

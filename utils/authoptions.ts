import { prisma } from "../prisma/db";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "process";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import cryptpassword from "@/hooks/usePasswordHashing";
import { loginSchema, signupSchema } from "@/libs/ValidateForm";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    GitHubProvider({
      clientId: env.GITHUB_ID as string,
      clientSecret: env.GITHUB_SECRET as string,
    }),
    // signup
    CredentialsProvider({
      name: "signup-form",
      id: "signup",
      credentials: {
        name: { label: "Username", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        confirmPassword: { label: "Confirm Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password, confirmPassword, name } = credentials!;

        const ValidateForm = signupSchema.safeParse(credentials);
        if (!ValidateForm.success) {
          throw new Error("Invalid form datas");
        }

        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }

        const prevUser = await prisma.user?.findFirst({
          where: { OR: [{ email }, { name }] },
        });
        if (prevUser) {
          throw new Error("User with this email or username already exists");
        }

        const { hashPassword } = cryptpassword();
        const hashedPassword = await hashPassword({ password });

        // Create user
        const user = await prisma.user.create({
          data: {
            email: email,
            password: hashedPassword,
            name: name,
          },
        });

        return user as any;
      },
    }),

    // login
    CredentialsProvider({
      name: "login-form",
      id: "login",
      credentials: {
        name: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { password, name } = credentials!;
        const { comparePassword } = cryptpassword();

        // validate form
        const ValidateForm = loginSchema.safeParse({ password, name });
        if (!ValidateForm.success) {
          throw new Error("Invalid form datas");
        }

        // find user
        const prevUser = await prisma.user?.findUnique({
          where: { name },
        });
        if (!prevUser?.password) {
          throw new Error("User with this username is not exists");
        }

        // // Check if password and confirmPassword match

        const ValidatePass = await comparePassword({
          hashedPassword: prevUser.password,
          password,
        });

        if (!ValidatePass) {
          throw new Error("Passwords do not match");
        }

        return prevUser;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      console.log(token);

      if (account?.refresh_token) {
        token.refresh_token = account.refresh_token;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.refresh_token) {
        session.refresh_token = token.refresh_token as string;
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  debug: true,

  secret: env.NEXTAUTH_SECRET,
};

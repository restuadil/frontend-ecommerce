import { env } from "@/config/env";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  IJWTExtended,
  ILogin,
  ISessionExtended,
  IUserExtended,
} from "@/types/auth";
import { AuthService } from "@/services/auth.service";

export default NextAuth({
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 },
  secret: env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: { label: "identifier", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(
        credentials: Record<"identifier" | "password", string> | undefined
      ): Promise<IUserExtended | null> {
        const { identifier, password } = credentials as Required<ILogin>;

        const result = AuthService.login({ identifier, password });

        const accessToken = (await result).data.data;
        const profile = await AuthService.profile(accessToken);
        const user = profile.data.data;

        if (
          accessToken &&
          (await result).status === 200 &&
          user._id &&
          profile.status === 200
        ) {
          user.accessToken = accessToken;
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: ISessionExtended;
      token: IJWTExtended;
    }) {
      session.user = token.user;
      session.accesToken = token.user?.accessToken;

      return session;
    },
  },
});

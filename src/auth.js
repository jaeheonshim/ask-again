import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import client from "./lib/mongodb"
import connectMongo from "./mongoose"
import User from "./models/user"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      await connectMongo();

      const existingUser = await User({ id: user.id });

      if (!existingUser) {
        await User.create({
          id: user.id
        });
      }

      return true;
    },
  }
})
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import client from "./lib/mongodb"
import connectMongo from "./mongoose"
import User from "@/models/user"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await connectMongo();

      const existingUser = await User.findOne({ userId: user.id });

      if (!existingUser) {
        console.log("Creating a new user");
        await User.create({
          userId: user.id
        });
      }

      return true;
    },
  }
})
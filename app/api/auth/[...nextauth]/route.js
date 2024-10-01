import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "@/app/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });

          const user = await User.findOne({ email: credentials?.email });

          if (!user) {
            throw new Error("No user found with that email");
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValidPassword) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          throw new Error(error.message || "Something went wrong");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        // Find if user already exists in the database
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // If the user doesn't exist, save them with Google ID and profile image
          await User.create({
            name: user.name,
            email: user.email,
            googleId: account.id,
            image: profile.picture, // Save Google profile picture
          });
        } else {
          // Update existing user with Google ID and profile image if not already set
          existingUser.googleId = account.id;
          existingUser.image = profile.picture;
          await existingUser.save();
        }
      }
      return true; // Allow the sign-in
    },
  },
  pages: {
    signIn: '/signin', // Redirect to your custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

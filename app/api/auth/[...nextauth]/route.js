import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; // Correct import for Google Provider
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "@/app/models/User"; 

const handler = NextAuth({
  providers: [
    GoogleProvider({ // Corrected the provider name
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Fixed typo in 'clientSecret'
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
  pages: {
    signIn: '/signin', // Redirect to your custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET, // Make sure to set this
});

export { handler as GET, handler as POST };

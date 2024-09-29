import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "@/libs/mongodb";
import Shelter from "@/models/Shelter";
import bcrypt from "bcryptjs";

// Create NextAuth options as a named export
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Ensure MongoDB connection
        await connectMongoDB();

        // Find the shelter by email
        const shelter = await Shelter.findOne({ email: credentials.email });

        // If no shelter found, throw an error
        if (!shelter) {
          throw new Error("No user found with this email");
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          shelter.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Password is incorrect");
        }

        // Return the user object containing id, name, and email
        return { id: shelter._id.toString(), name: shelter.name, email: shelter.email };
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redirect to the login page on sign-in
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // Called when the JWT is created or updated
    async jwt({ token, user }) {
      // If user exists (during sign-in), add the user id to the token
      if (user) {
        token.id = user.id; // `user.id` is the shelter's ID
      }
      return token;
    },
    // Called whenever a session is checked or created
    async session({ session, token }) {
      // Attach token id to the session's user object
      if (token) {
        session.user.id = token.id; // `session.user.id` will be used in your app
      }
      return session;
    },
  },
};

// Create and export the handler function for the Next.js API
const handler = NextAuth(authOptions);

// Export the HTTP methods (GET and POST are necessary for NextAuth)
export { handler as GET, handler as POST };

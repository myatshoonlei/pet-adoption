import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token, // If there's a token, user is authorized
  },
});

export const config = { matcher: ["/shelter/profile"] }; // Protect profile route

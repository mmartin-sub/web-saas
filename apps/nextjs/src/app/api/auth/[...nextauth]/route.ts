import NextAuth from "next-auth";

import { authOptions } from "@saasfly/auth";

// See for the list of API endpoints: https://next-auth.js.org/getting-started/rest-api
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

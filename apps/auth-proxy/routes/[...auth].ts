import { Auth } from "@auth/core";
import GitHub from "@auth/core/providers/github";
// h3 is The Web Framework for Modern JavaScript Era - https://h3.unjs.io/
// https://h3.unjs.io/guide/event-handler
// @todo toWebRequest is not safe to use, see: https://h3.unjs.io/utils/request#towebrequestevent
import { eventHandler, toWebRequest } from "h3";

export default eventHandler(async (event) =>
  Auth(toWebRequest(event), {
    secret: process.env.AUTH_SECRET,
    trustHost: !!process.env.VERCEL, // Required if not using Vercel
    redirectProxyUrl: process.env.AUTH_REDIRECT_PROXY_URL,
    providers: [
      GitHub({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      }),
    ],
  }),
);

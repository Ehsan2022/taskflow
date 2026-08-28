// proxy.ts

import { auth } from "@/auth";

export const proxy = auth((request) => {
  const isLoggedIn = !!request.auth;

  if (!isLoggedIn) {
    return Response.redirect(new URL("/login", request.url));
  }
});

export const config = {
  matcher: ["/tasks/:path*"],
};
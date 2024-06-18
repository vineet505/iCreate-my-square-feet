export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/users",
    "/",
    "/policies",
    "/staff",
    "/users/(.*)",
    "/profile",
    "/region",
    "/region/(.*)",
    "/investment",
    "/investment/(.*)",
    "/recommend",
    "/ads",
    "/cta",
    "/dashboard",
    "/welcome",
    "/transactions",
    "/trade",
  ],
};

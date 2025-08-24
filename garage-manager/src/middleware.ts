import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const loginUrl = new URL(`/login`, req.url);

  const publicPaths: string[] = ["/login", "_next/image"];

  if (
    !token &&
    !publicPaths.some((path) => req.nextUrl.pathname.includes(path))
  ) {
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/((?!.*\\.|api\\/|forgot-password|reset-password).*)"],
};

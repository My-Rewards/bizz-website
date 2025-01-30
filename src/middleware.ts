import { NextRequest, NextResponse } from "next/server";
import { currUserData } from "@/components/amplify-server-methods";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  const session = await currUserData();
  
  const { verified, linked } = session || {};

  const parsedURL = new URL(request.url);
  const path = parsedURL.pathname;

  const specialRoutes = ["/Auth", "/LinkAccount"];
  const isSpecialRoute = specialRoutes.some(route => path.includes(route))
  
  switch(true){
    case (!verified && path !== "/Auth"): return NextResponse.redirect(new URL(`/Auth?redirect=${encodeURIComponent(path)}`, request.url));
    case (verified && !linked && path !== '/LinkAccount'): return NextResponse.redirect(new URL(`/LinkAccount`, request.url));
    case (verified && linked && isSpecialRoute): return NextResponse.redirect(new URL(`/Organizations`, request.url));;
    default: return response
  }
}

export const config = {
  matcher: [
    "/LinkAccount",
    "/Organizations/:path*",
    "/Billing/:path*",
    "/Account",
    "/Auth",
    "/((?!api|_next/static|_next/image|favicon.ico|).*)"
  ],
};

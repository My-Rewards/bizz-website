import { NextRequest, NextResponse } from "next/server";
import { currUserData } from "@/components/amplify-server-methods";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  const session = await currUserData();
  
  const { verified, linked } = session || {};

  const parsedURL = new URL(request.url);
  const path = parsedURL.pathname;

  return NextResponse.redirect(new URL(`/LinkAccount`, request.url));

  switch(true){
    case (!verified && !linked && path === "/Auth"): return response;
    case (verified && path.includes("/Auth")): return NextResponse.redirect(new URL(`/Organizations`, request.url));
    case (verified && !linked): return NextResponse.redirect(new URL(`/LinkAccount`, request.url));
    case (verified && linked && !path.includes("/Auth")): return response;
    case (!verified && !linked): return NextResponse.redirect(new URL(`/Auth?redirect=${encodeURIComponent(path)}`, request.url));
    default: return NextResponse.redirect(new URL(`/Organizations`, request.url));;
  }
}

export const config = {
  matcher: [
    "/Organizations/:path*",
    "/Billing/:path*",
    "/LinkAccount",
    "/Account",
    "/Auth",
    "/((?!api|_next/static|_next/image|favicon.ico|).*)"
  ],
};

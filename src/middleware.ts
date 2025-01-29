import { fetchAuthSession } from "aws-amplify/auth/server";
import { NextRequest, NextResponse } from "next/server";
import { runWithAmplifyServerContext } from "@/app/util/amplifyServerUtils";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec)
        return session.tokens !== undefined;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });

  const parsedURL = new URL(request.url);
  const path = parsedURL.pathname;

  response.headers.set('authenticated', authenticated ? 'true' : 'false');

  if (authenticated && path === '/Auth') {
    return NextResponse.redirect(new URL(`/Organizations`, request.url));
  }else if (authenticated){
    return response
  }

  if(path === '/' || path === '/Auth' || path === '/callback'){
    return response;
  }else {
    return NextResponse.redirect(new URL(`/Auth?redirect=${path}`, request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     */
    '/Organizations',
    '/Organizations/:id',
    '/Billing',
    '/Billing/:id',
    '/Account',
    '/((?!api|_next/static|_next/image|favicon.ico|).*)'
  ],
};
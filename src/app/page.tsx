"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { fetchAuthSession } from "aws-amplify/auth";
import 'aws-amplify/auth/enable-oauth-listener';

export default function Reroute() {
  const router = useRouter();
  const pathname = usePathname();

  const redirect = sessionStorage.getItem("redirect");
  sessionStorage.removeItem("redirect");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await fetchAuthSession();

        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/Dashboard"); 
        }

        if (user.userSub && user.tokens) {
          // User is authenticated
          if (pathname === "/Auth" || pathname === "/") {
            router.push("/Organizations"); // Redirect to Dashboard if on auth or root
          }
        } else {
          // User is not authenticated
          if (pathname === "/" || pathname === "/Dashboard") {
            router.push("/Auth"); // Redirect to auth if on root or dashboard
          }
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        // If there's an error fetching the session, assume unauthenticated
        if (pathname === "/" || pathname === "/Dashboard") {
          router.push("/Auth");
        }
      }
    };
    checkAuth();
  }, [pathname, router]);

  return null;
}

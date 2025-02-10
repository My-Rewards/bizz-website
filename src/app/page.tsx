"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { fetchAuthSession} from "@aws-amplify/auth";
import 'aws-amplify/auth/enable-oauth-listener';
import Loading from "@/components/loading";
import { useCookies } from "react-cookie";

export default function Reroute() {
  const router = useRouter();
  const pathname = usePathname();
  const [cookies,,removeCookie] = useCookies(['redirect']); 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await fetchAuthSession();
        
        if (session.userSub && session.tokens) {
          if (cookies.redirect) {
            const path = cookies.redirect;

            removeCookie('redirect', {
              path: '/',
              domain: window.location.hostname,
              secure: true,
              sameSite: 'strict'
            });

            router.push(path);
          }
          else if (pathname === "/Login" || pathname === "/SignU" || pathname === "/") {
            router.push("/Organizations");
          }
        } else if (pathname === "/" || pathname === "/Organizations") {
          router.push("/Login");
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        router.push("/Login");
      }
    };
    checkAuth();
  }, [pathname, router]);

  return (<Loading />);
}

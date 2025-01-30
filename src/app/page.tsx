"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { fetchAuthSession} from "@aws-amplify/auth";
import 'aws-amplify/auth/enable-oauth-listener';
import Loading from "@/components/loading";

export default function Reroute() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await fetchAuthSession();

        const redirect = sessionStorage.getItem("redirect");
        sessionStorage.removeItem("redirect");      

        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/Organizations"); 
        }

        if (session.userSub && session.tokens) {
          if (pathname === "/Auth" || pathname === "/") {
            router.push("/Organizations");
          }
        } else {
          if (pathname === "/" || pathname === "/Organizations") {
            router.push("/Auth");
          }
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        router.push("/Auth");
      }
    };
    checkAuth();
  }, [pathname, router]);

  return (<Loading />);
}

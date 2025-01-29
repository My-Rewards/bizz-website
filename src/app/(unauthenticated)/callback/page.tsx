"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchAuthSession } from "aws-amplify/auth";
import 'aws-amplify/auth/enable-oauth-listener';

export default function CallBack() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await fetchAuthSession();
        if (user.userSub && user.tokens) {
          console.log(user)
          router.push("/Organizations");
        } else {
          router.push("/Auth");
        }
      } catch {
        router.push("/Auth");
      }
    };
    checkAuth();
  }, []);

  return null;
}

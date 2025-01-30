"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import 'aws-amplify/auth/enable-oauth-listener';
import Loading from "@/components/loading";
import { useCookies } from "react-cookie";

export default function CallBack() {
    const [cookies] = useCookies(['square_state']); 
    const router = useRouter();

    useEffect(() => {
        async function connectSquare (){
            const url = new URL(window.location.href);

            const params = new URLSearchParams(url.search);
            const code = params.get('code');
            const state = params.get('state');

            if (!cookies.square_state || cookies.square_state !== state) {
              console.error("Invalid state parameter or state mismatch!");
              router.push('/error');
              return;
            }

            if (code) {
              try{
                const { tokens } = await fetchAuthSession();
                const user = await getCurrentUser()

                const body={
                    authCode: code,
                    userSub: user.userId,
                    codeVerifier: state,
                }

                const response = await fetch('https://beta.api.myrewards.website/connect', {
                  method: 'POST',
                  headers: {
                    'Authorization': `${tokens?.idToken?.toString()}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(body),
                });

                if(!response) throw Error;
                
                const connected = await fetch('https://beta.api.myrewards.website/business/user/linked', {
                  method: 'POST',
                  headers: {
                    'Authorization': `${tokens?.idToken?.toString()}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ userSub: user.userId }),
                });

                if(connected){
                  router.replace('/')
                }
              }catch{
                console.error('Something went wrong with fetch APIS')
              }
            } else {
              console.error("Authorization code not found in the URL.");
            }
        }
        connectSquare();
    }, []);
    
  return(<Loading/>);
}

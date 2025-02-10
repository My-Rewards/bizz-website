"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as Auth from "aws-amplify/auth";
import { useCookies } from "react-cookie";
import { Button, View } from "@aws-amplify/ui-react";
import Image from "next/image";
import { color_pallete } from "@/static/colors";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import logo from '@/assets/MyRewardsLogo3.svg'
import "./auth.css"

const LoginPage = () => {
  const [, setCookie] = useCookies(["redirect"]);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    async function runStart(){
      const redirectPath = window.location.search ? new URLSearchParams(window.location.search).get("redirect") : null;
      const userLoggedIn = await Auth.fetchAuthSession();
  
      if (redirectPath && userLoggedIn.tokens) {
        setCookie("redirect", redirectPath, { path: "/", secure: true });
      }
    }
    runStart()
  }, [setCookie]);

  const handleGoogleSignIn = async () => {
    try {
      await Auth.signInWithRedirect({ provider: "Google" });
      router.push("/Organizations");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSignIn = async () => {
    try{
      await Auth.signIn({
        username:email, 
        password:password
      })
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="flex flex-1 justify-center items-center min-h-screen">
      <View className="flex flex-col max-w-sm w-full">
        <View className="flex w-full pb-2">
          <Image
            alt="Amplify logo"
            src={logo}
            style={{width:'80%', marginInline:'auto'}}
          />
        </View>
        <div className="flex bg-white flex-col p-6 px-8 gap-3 rounded-lg shadow-lg max-w-sm w-full">
          <View>
            <form className="flex justify-center flex-col gap-4" onSubmit={handleSignIn}>
              <Button onClick={handleGoogleSignIn} isFullWidth>
              <div className="gsi-material-button">
                <div className="gsi-material-button-state"></div>
                <div className="gsi-material-button-content-wrapper">
                  <div className="gsi-material-button-icon">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{display: 'block'}}>
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  </div>
                  <span className="gsi-material-button-contents">Sign in with Google</span>
                </div>
              </div>
              </Button>
              <div className="flex w-full gap-6 justify-center mt-2">
                <div className="flex flex-1 h-px self-center bg-black opacity-50"/>
                <span className="flex text-black opacity-60">or</span>
                <div className="flex flex-1 h-px  self-center bg-black opacity-50"/>
              </div>
              <div className="flex flex-col gap-1 justify-center">
                <p className="flex my-auto text-sm font-medium ml-1.5" style={{fontFamily:'Avenir Next'}}>Email</p>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex self-center w-full px-3 py-1 rounded-lg border-1"
                  style={{outlineColor:color_pallete[1], outlineWidth:1, fontFamily:'Avenir Next'}}
                />
              </div>
              <div className="flex flex-col gap-1 justify-center ">
                <p className="flex my-auto text-sm font-medium ml-1.5" style={{fontFamily:'Avenir Next'}}>Password</p>
                <div className="flex self-center w-full rounded-lg border-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="px-3 py-1.5 rounded-l-lg flex-1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password"
                    required
                    style={{outlineColor: color_pallete[1], outlineWidth:1, fontFamily:'Avenir Next'}}
                  />
                  <Button className="flex justify-center px-4 cursor-pointer border-l-1" onClick={(e)=>{e.preventDefault(); setShowPassword(!showPassword)}}>
                    {showPassword ? <IoMdEye className="self-center"/> : <IoMdEyeOff className="self-center"/>}
                  </Button>
                </div>
              </div>
              <div className="flex w-full items-center">
                <button 
                  className="flex mx-auto self-center text-white px-8 py-2 my-2 rounded-lg cursor-pointer"
                  style={{backgroundColor:color_pallete[1]}}
                  type="submit"  
                  >
                  Sign In
                </button>
                <Button 
                  style={{color:color_pallete[1], fontSize:14}}
                  className="flex cursor-pointer rounded-xs mx-auto" 
                  onClick={() => router.push("/SignUp")} 
                  size="small" 
                  variation="link">
                    Reset Password
                </Button>
              </div>
            </form>
          </View>
          <div className="flex text-center flex-col gap-2 justify-center self-center">
            <Button 
            style={{color:color_pallete[1], fontSize:14}}
            className="flex cursor-pointer rounded-xs underline" 
            onClick={() => router.push("/SignUp")} 
            size="small" 
            variation="link">
              Don&apos;t have an account? Sign Up
            </Button>

          </div>
        </div>
      </View>
    </div>
  );
};

export default LoginPage;

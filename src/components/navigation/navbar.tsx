"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/MyRewardsLogo3(2).svg";
import Image from "next/image";
import './navbar.css'
import { color_pallete } from "@/static/colors";

const Navbar = () => {
  const pathname = usePathname();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  
  useEffect(() => {
    const updateWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    console.log(windowWidth)

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, [windowWidth]);

  const isActive = (path: string) => pathname.includes(path);
  
  if(windowWidth >= 650){
    return (
      <div className="navbar">
        <div className="spacer">
          <div className="flex relative w-fit">
            <Image src={logo} alt="MyRewards Logo" height={50}/>
            {process.env.NEXT_PUBLIC_APP_ENV === 'beta' && <span className="absolute -top-1 -right-4 rounded-full px-2 text-white font-bold text-xs" style={{backgroundColor:color_pallete[3]}}>Beta</span>}
          </div>
        </div>
        <div className="nav-options">
            <Link
              className={isActive("/Organizations") ? "nav-option-selected" : "nav-option"}
              href={"/Organizations"}
            >
              Organizations
            </Link>
            <Link
              className={isActive("/Account") ? "nav-option-selected" : "nav-option"}
              href={"/Account"}
            >
              Account
            </Link>
            <Link
              className={isActive("/Billing") ? "nav-option-selected" : "nav-option"}
              href={"/Billing"}
            >
              Billing
            </Link>
          </div>
      </div>
    );
  }else{
    return (
      <div className="navbar">
        <div className="spacer">
          <Image src={logo} alt="MyRewards Logo" height={50} />
        </div>
        <div className="nav-options">
          </div>
      </div>
    );
  }
};

export default Navbar;

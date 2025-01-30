"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/MyRewardsLogo3(2).svg";
import Image from "next/image";
import './navbar.css'

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
  }, []);

  const isActive = (path: string) => pathname.includes(path);
  
  if(windowWidth >= 650){
    return (
      <div className="navbar">
        <div className="spacer">
          <Image src={logo} alt="MyRewards Logo" height={50} />
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

"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/MyRewardsLogo3(2).svg";
import Image from "next/image";
import './navbar.css'

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.includes(path);
  
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
};

export default Navbar;

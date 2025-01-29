"use client";
import { signOut } from "aws-amplify/auth";
import { redirect } from "next/navigation";
import * as React from 'react';

export default function Dashboard() {
  return (
    <div className="page-1">
      <h1> This is the Dashboard </h1>
      <button  onClick={async ()=>{await signOut(); redirect('/')}}>Sign Out</button>
    </div>
  )
}
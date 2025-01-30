"use client";
import * as React from 'react';
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const SQUARE_OAUTH_LINK = `https://connect.${process.env.NEXT_PUBLIC_APP_ENV === 'prod'? 'squareup':'squareupsandbox'}.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_SQUARE_CLIENT}&scope=MERCHANT_PROFILE_READ%20PAYMENTS_READ%20ORDERS_READ%20CUSTOMERS_READ%20INVOICES_READ&session=false`;

export default function LinkAccount(){
    const [cookies, setCookie] = useCookies(["square_state"]);

    const generateSecureState = () => {
        return [...Array(30)]
            .map(() => Math.random().toString(36)[2])
            .join("");
    };

    useEffect(() => {
        if (!cookies.square_state) {
            const secureState = generateSecureState();
            setCookie("square_state", secureState, {
                path: "/",
                secure: true,
                sameSite: "strict",
            });
        }
    }, [cookies.square_state, setCookie]);

    const secureState = cookies.square_state;

    const betaLink = `${SQUARE_OAUTH_LINK}&state=${secureState}`;

    const redirectSquarePage = () => {
        window.location.href = betaLink;
    };

    return (
        <div className='flex flex-1 flex-col justify-center align-middle gap-y-10'>
            <h1 className='flex self-center text-2xl'>Link your account with Square</h1>
            <div className='flex self-center flex-col gap-y-5'>
                <button onClick={redirectSquarePage} className='flex self-center p-3 rounded-2xl cursor-pointer' style={{backgroundColor:'var(--color-0)'}}>
                    <h1 className='flex text-white font-bold text-lg'>Link Square Account</h1>
                </button>
                <h1 className='flex text-wrap text-center w-xl text-black opacity-60 font-bold text-sm'>Link Your square account to whicever account you use at the business you want to register with us. This is required to allow for us to track reward spendings and collect points, your account is not complete until it is Linked to a square account</h1>
            </div>
        </div>
    );
};
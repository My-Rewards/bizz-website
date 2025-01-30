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
        <div className='flex flex-1 flex-col justify-center align-middle'>
            <h1 className='flex self-center'>Need to authenticate your business</h1>
            <button onClick={redirectSquarePage} className='flex bg-amber-400 self-center p-3 rounded-2xl cursor-pointer'>
                Link Square Account
            </button>
        </div>
    );
};
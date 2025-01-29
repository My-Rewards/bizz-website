"use client";
import { BillingInfo } from "./page";

export default function ClientComponent ({data}:{data:BillingInfo}){

    return(
    <div>
        <h1>{data.id}</h1>
    </div>
    );
}
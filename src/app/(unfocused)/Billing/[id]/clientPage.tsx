"use client";
import { BillingInfo } from "./page";

export default function ClientComponent ({data}:{data:BillingInfo}){

    return(
    <div className="flex-1">
        <h1>{data.id}</h1>
    </div>
    );
}
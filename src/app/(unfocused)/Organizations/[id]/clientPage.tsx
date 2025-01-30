"use client";
import { OrganizationInfo } from "./page";

export default function ClientComponent ({data}:{data:OrganizationInfo}){

    return(
    <div className="flex-1">
        <h1>{data.id}</h1>
    </div>
    );
}
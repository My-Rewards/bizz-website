"use client";
import { OrgProps } from "./page";
import Link from "next/link";

export default function ClientComponent({ data }: { data: OrgProps[] }) {
  
  return (
    <div className="flex flex-1 flex-col gap-3">
      {data.map((item) => (
        <Link
          key={item.id}
          style={{
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: item.active ? "#e0ffe0" : "#ffe0e0",
            cursor: "pointer",
          }}
          href={`/Organizations/${item.id}`}
          shallow={false}
          prefetch={true}
        >
          <h2 style={{ margin: "0 0 10px" }}>{item.title}</h2>
          <p>
            <strong>ID:</strong> {item.id}
          </p>
          <p>
            <strong>Status:</strong>
            <span style={{ color: item.active ? "green" : "red" }}>
              {item.active ? "Active" : "Inactive"}
            </span>
          </p>
        </Link>
      ))}
      <Link
        href={`/Create-Organization`} 
        shallow={false}
        prefetch={true}>
           Add account
      </Link>
    </div>
  );
}

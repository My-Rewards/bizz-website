"use client";
import { useRouter } from "next/navigation";
import { OrgProps } from "./page";

export default function ClientComponent({ data }: { data: OrgProps[] }) {
  const router = useRouter();
    
  return (
    <div style={{ display: "grid", gap: "10px" }}>
      {data.map((item) => (
        <button
          key={item.id}
          style={{
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: item.active ? "#e0ffe0" : "#ffe0e0",
            cursor: "pointer",
          }}
          onClick={() =>{ router.push(`/Billing/${item.id}`);  }}
        >
          <h2 style={{ margin: "0 0 10px" }}>{item.title}</h2>
          <p>
            <strong>ID:</strong> {item.id}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span style={{ color: item.active ? "green" : "red" }}>
              {item.active ? "Active" : "Inactive"}
            </span>
          </p>
        </button>
      ))}
    </div>
  );
}

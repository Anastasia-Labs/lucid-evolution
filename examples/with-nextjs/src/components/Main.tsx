"use client";
import dynamic from "next/dynamic";
const Stake = dynamic(() => import("./Delegate"), { ssr: false });

export default function Main() {
  return (
    <div className="flex">
      <Stake />
    </div>
  );
}

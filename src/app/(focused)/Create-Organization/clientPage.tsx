"use client";
import { useRouter } from "next/navigation";
import StatusBar from "./StatusBar";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { color_pallete } from "@/static/colors";
import { STEPS } from "./page";

const MAXSTEPS = 3;

export default function ClientComponent() {
  const router = useRouter();
  const [position, setPosition] = useState(0);

  const handleBack = () => {
    if (position > 0) {
      setPosition(position - 1);
    } else {
      router.replace("/Organizations");
    }
  };

  const handleNext = () => {
    if(position === MAXSTEPS){
      console.log('complete')
    }
    if (position < MAXSTEPS) {
      setPosition(position + 1);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <StatusBar position={position} />
      <div className="flex flex-1">
        <Pages position={position} handleBack={handleBack} handleNext={handleNext} />
      </div>
    </div>
  );
}

function Pages({ position, handleBack, handleNext }: { position: number; handleBack: () => void; handleNext: () => void }) {
  return (
    <div className="flex flex-1 relative gap-2 flex-col align-middle">
      <div className="absolute top-0 left-0">
        <button className="px-4 py-4 cursor-pointer" onClick={handleBack}>
          <FaChevronLeft size={35} color={color_pallete[3]}/>
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-3 align-middle">
        <h1 className="text-2xl font-semibold mx-auto p-4" style={{color:color_pallete[2]}}>{STEPS[position]}</h1>
        <div className="flex flex-1 self-center">
        </div>
      </div>
      <button className="px-4 py-2 text-white rounded-lg ml-auto mr-auto mb-20 cursor-pointer" style={{backgroundColor:color_pallete[3]}} onClick={handleNext}>
        {position === MAXSTEPS? 'Complete':'Continue'}
      </button>
    </div>
  );
}

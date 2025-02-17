"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import StatusBar from "./StatusBar";
import { color_pallete } from "@/static/colors";

// Import step components
import BusinessDetails from "./businessDetails";
import MilestoneStructure from "./milestoneStructure";
import LoyaltyStructure from "./loyaltyStructure";
import ConfirmInformation from "./confirmInformation";

const MAXSTEPS = 4; // Updated to reflect the 4 signup steps

export default function ClientComponent() {
    const router = useRouter();
    const [step, setStep] = useState(1);

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            router.replace("/Organizations"); // Redirect if on the first step
        }
    };

    const handleNext = () => {
        if (step < MAXSTEPS) {
            setStep(step + 1);
        } else {
            console.log("Signup Complete"); // Could trigger a submission here
        }
    };

    return (
        <div className="flex flex-1 flex-col">
            <StatusBar position={step - 1} /> {/* Keeps progress tracking */}
            <div className="flex flex-1">
                <Pages step={step} handleBack={handleBack} handleNext={handleNext} />
            </div>
        </div>
    );
}

function Pages({ step, handleBack, handleNext }: { step: number; handleBack: () => void; handleNext: () => void }) {
    return (
        <div className="flex flex-1 relative gap-2 flex-col align-middle">
            {/* Back Button */}
            <div className="absolute top-0 left-0">
                <button className="px-4 py-4 cursor-pointer" onClick={handleBack}>
                    <FaChevronLeft size={35} color={color_pallete[3]} />
                </button>
            </div>

            {/* Step Components (Dynamically Rendered) */}
            {step === 1 && <BusinessDetails nextStep={handleNext} />}
            {step === 2 && <MilestoneStructure nextStep={handleNext} prevStep={handleBack} />}
            {step === 3 && <LoyaltyStructure nextStep={handleNext} prevStep={handleBack} />}
            {step === 4 && <ConfirmInformation prevStep={handleBack} />}
        </div>
    );
}

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

    const handleSubmit = () => {
        console.log("Form Submitted!", formData);
        // You can send formData to an API or process it here
    };

    const [formData, setFormData] = useState({
        businessName: "",
        businessDescription: "",
        businessTags: [],
        logo: "",
        banner: "",
        pointsPerDollar: 0,
        loyaltyRewards: [["", "", ""], ["", "", ""], ["", "", ""]],
        milestoneRewards: ["", "", ""],
        visitsUntilNextTier: "",
    });


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
                <Pages
                    step={step}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    submitForm={handleSubmit}
                    formData={formData}
                    setFormData={setFormData}
                />

            </div>
        </div>
    );
}

function Pages({
                   step,
                   handleBack,
                   handleNext,
                   submitForm,
                   formData,
                   setFormData
               }: {
    step: number;
    handleBack: () => void;
    handleNext: () => void;
    submitForm: () => void;
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}) {

    return (
        <div className="flex flex-1 relative gap-2 flex-col align-middle">
            {/* Back Button */}
            <div className="absolute top-0 left-0">
                <button className="px-4 py-4 cursor-pointer" onClick={handleBack}>
                    <FaChevronLeft size={35} color={color_pallete[3]} />
                </button>
            </div>

            {/* Step Components (Dynamically Rendered) */}
            {step === 1 && <BusinessDetails nextStepAction={handleNext} formData={formData} setFormDataAction={setFormData} />}
            {step === 2 && <MilestoneStructure nextStepAction={handleNext} prevStepAction={handleBack} formData={formData} setFormDataAction={setFormData} />}
            {step === 3 && <LoyaltyStructure nextStepAction={handleNext} prevStepAction={handleBack} formData={formData} setFormDataAction={setFormData} />}
            {step === 4 && <ConfirmInformation prevStepAction={handleBack} submitFormAction={submitForm} formData={formData} />}

        </div>
    );
}
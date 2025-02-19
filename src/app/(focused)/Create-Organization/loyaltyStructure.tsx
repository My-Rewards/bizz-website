"use client";
import Image from "next/image";
import MyRewardsLogo from "@/assets/MyRewardsLogo3(2).svg";
import { FaChevronLeft } from "react-icons/fa6";
import {color_pallete} from "@/static/colors";

export default function LoyaltyStructure({
                                             nextStepAction,
                                             prevStepAction,
                                             formData,
                                             setFormDataAction,
                                         }: {
    nextStepAction: () => void;
    prevStepAction: () => void;
    formData: any;
    setFormDataAction: React.Dispatch<React.SetStateAction<any>>;
}) {


    const handleRewardChange = (tierIndex: number, optionIndex: number, value: string) => {
        setFormDataAction((prev: any) => {
            const newRewards = [...prev.loyaltyRewards];
            newRewards[tierIndex][optionIndex] = value;
            return { ...prev, loyaltyRewards: newRewards };
        });
    };

    return (
        <div className="flex flex-1 flex-col gap-6 items-center relative">

            {/* Back Button */}
            <div className="absolute top-0 left-0">
                <button className="px-4 py-4 cursor-pointer" onClick={prevStepAction}>
                    <FaChevronLeft size={35} color="#7F513A"/>
                </button>
            </div>

            {/* Logo */}
            <Image src={MyRewardsLogo} alt="My Rewards Logo" width={292} height={58} priority className="mt-[50px]" />

            {/* Section Title */}
            <div className="flex flex-col w-[700px] mt-[50px]">
                <div className="flex items-center">
                    <h2 className="text-[22px] font-semibold tracking-[0%] text-[#7F513A] whitespace-nowrap">
                        LOYALTY REWARDS STRUCTURE
                    </h2>
                    <div className="ml-4 flex-1 border-[3px] border-[#7F513A] h-0"></div>
                </div>

                <p className="text-[16px] leading-[21.86px] italic text-[#7F513A] mt-2">
                    <span className="text-red-700">*</span> indicates a required field
                </p>
            </div>

            {/* Visits Until Next Tier */}
            <div className="flex flex-col w-[700px] mt-4">
                <h3 className="text-[#7F513A] text-[18px] font-semibold">Customize Your Loyalty Reward Structure</h3>
                <p className="text-[#7F513A] text-[16px] italic">
                    Milestone Rewards are based on visits. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>

                <label className="text-[#7F513A] text-[18px] font-semibold mt-4">
                    <span className="text-red-700">*</span> Visits until next Tier
                </label>
                <p className="text-[#7F513A] italic mt-2">We recommend ___ because of ___</p>
                <div className="flex items-center mt-2">
                    <input
                        type="text"
                        placeholder="X"
                        value={formData.visitsUntilNextTier} // Uses formData
                        onChange={(e) => setFormDataAction((prev: any) => ({
                            ...prev,
                            visitsUntilNextTier: e.target.value
                        }))} // Updates formData
                        className="w-[50px] h-[40px] text-center border border-[#7F513A] rounded-md text-[#7F513A] font-semibold text-lg"
                    />
                </div>

            </div>

            {/* Tier Reward Sections */}
            {formData.loyaltyRewards.map((tier: string[], tierIndex: number) => (
                <div key={tierIndex} className="flex flex-col w-[700px] mt-6">
                    <h3 className="text-[#7F513A] text-[18px] font-semibold">Tier {tierIndex + 1} Reward options</h3>
                    <p className="text-[#7F513A] italic text-[16px]">Choose up to 3 reward options. We recommend an X dollar value.</p>

                    {tier.map((reward, optionIndex) => (
                        <div key={optionIndex} className="flex flex-col mt-4">
                            <label className="text-[#7F513A] text-[18px] font-semibold">
                                {optionIndex === 0 ? <span className="text-red-700">*</span> : null} Option #{optionIndex + 1}
                            </label>
                            <input
                                type="text"
                                placeholder="Reward Name"
                                value={reward}
                                onChange={(e) => handleRewardChange(tierIndex, optionIndex, e.target.value)}
                                className="mt-2 w-full h-[50px] px-4 border border-[#7F513A] rounded-md text-[#7F513A] bg-transparent"
                            />
                        </div>
                    ))}
                </div>
            ))}

            {/* Next Button */}
            <button
                className="px-4 py-2 text-white rounded-lg mt-10 mb-16 cursor-pointer w-60"
                style={{backgroundColor: color_pallete[3]}}
                onClick={nextStepAction}
            >
                Next
            </button>

        </div>
    );
}

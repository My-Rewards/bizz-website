"use client";
import Image from "next/image";
import MyRewardsLogo from "@/assets/MyRewardsLogo3(2).svg";
import { FaChevronLeft } from "react-icons/fa6";
import {color_pallete} from "@/static/colors";

export default function MilestoneStructure({
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

    const handleRewardChange = (index: number, value: string) => {
        setFormDataAction((prev: any) => {
            const newRewards = [...prev.milestoneRewards];
            newRewards[index] = value;
            return { ...prev, milestoneRewards: newRewards };
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

            {/* Section: Title, Line, & Required Field Text */}
            <div className="flex flex-col w-[700px] mt-[50px]">
                <div className="flex items-center">
                    <h2 className="text-[22px] font-semibold tracking-[0%] text-[#7F513A] whitespace-nowrap">
                        MILESTONE REWARDS STRUCTURE
                    </h2>
                    <div className="ml-4 flex-1 border-[3px] border-[#7F513A] h-0"></div>
                </div>

                {/* Required Field Indicator (Directly Below) */}
                <p className="text-[16px] leading-[21.86px] italic text-[#7F513A] mt-2">
                    <span className="text-red-700">*</span> indicates a required field
                </p>
            </div>

            {/* Customize Your Milestone Reward Structure */}
            <div className="flex flex-col w-[700px] mt-4">
                <h3 className="text-[#7F513A] text-[18px] font-semibold">Customize Your Milestone Reward Structure</h3>
                <p className="text-[#7F513A] text-[16px] italic">
                    Milestone Rewards are based on expenditure. This track ...Lorem ipsum odor amet, consectetur adipiscing elit.
                    Est eget vulputate facilisi praesent bibendum justo urna. Scelerisque tempus ullamcorper mauris, viverra aliquet praesent primis.
                </p>
            </div>

            {/* Points Per Dollar Field */}
            <div className="flex flex-col w-[700px] mt-4">
                <label className="text-[#7F513A] text-[18px] font-semibold">
                    <span className="text-red-700">*</span> Points per $
                </label>
                <div className="flex items-center mt-2">
                    <input
                        type="text"
                        placeholder="X"
                        value={formData.pointsPerDollar} // Uses formData
                        onChange={(e) => setFormDataAction((prev: any) => ({
                            ...prev,
                            pointsPerDollar: e.target.value
                        }))} // Updates formData
                        className="w-[50px] h-[40px] text-center border border-[#7F513A] rounded-md text-[#7F513A] font-semibold text-lg"
                    />

                    <span className="ml-3 text-[#7F513A]">points for $1</span>
                </div>
                {/* Recommendation text should be below, not next to input */}
                <p className="text-[#7F513A] italic mt-2">We recommend ___ because of ___</p>
            </div>

            {/* Reward Options Section */}
            <div className="flex flex-col w-[700px] mt-6">
                <h3 className="text-[#7F513A] text-[18px] font-semibold">Reward options</h3>
                <p className="text-[#7F513A] italic text-[16px]">Choose up to 3 reward options</p>

                {/* Reward Option Inputs */}
                {formData.milestoneRewards.map((reward: string, index: number) => (
                    <div key={index} className="flex flex-col mt-4">
                        <label className="text-[#7F513A] text-[18px] font-semibold">
                            {index === 0 ? <span className="text-red-700">*</span> : null} Option #{index + 1}
                        </label>
                        <input
                            type="text"
                            placeholder="Reward Name"
                            value={reward}
                            onChange={(e) => handleRewardChange(index, e.target.value)}
                            className="mt-2 w-full h-[50px] px-4 border border-[#7F513A] rounded-md text-[#7F513A] bg-transparent"
                        />
                    </div>
                ))}

            </div>

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

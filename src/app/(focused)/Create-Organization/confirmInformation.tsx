"use client";
import Image from "next/image";
import { useState } from "react";
import MyRewardsLogo from "@/assets/MyRewardsLogo3(2).svg";
import { FaChevronLeft } from "react-icons/fa6";
import { color_pallete } from "@/static/colors";

export default function ConfirmInformation({ prevStepAction, submitFormAction, formData = {} }: { prevStepAction: () => void; submitFormAction: () => void; formData?: any }) {

    const [disableLoyalty, setDisableLoyalty] = useState(false);
    const [disableMilestone, setDisableMilestone] = useState(false);

    return (
        <div className="flex flex-1 flex-col gap-6 items-center relative">

            {/* Back Button */}
            <div className="absolute top-0 left-0">
                <button className="px-4 py-4 cursor-pointer" onClick={prevStepAction}>
                    <FaChevronLeft size={35} color="#7F513A" />
                </button>
            </div>

            {/* Logo */}
            <Image src={MyRewardsLogo} alt="My Rewards Logo" width={292} height={58} priority className="mt-[50px]" />

            {/* Review Organization Details */}
            <div className="flex flex-col w-[700px] mt-[50px] border border-[#7F513A] rounded-lg p-4">
                <h2 className="text-[22px] font-semibold text-[#E58D6D]">REVIEW ORGANIZATION DETAILS</h2>

                <p className="text-[#7F513A] font-semibold mt-4">Business Name: {formData.businessName}</p>
                <p className="text-[#7F513A] mt-2">Description: {formData.businessDescription}</p>

                {/* Divider */}
                <hr className="border-t-2 border-[#7F513A] my-4" />

                {/* Business Tags */}
                <p className="text-[#7F513A] font-semibold">Business Tags:</p>
                <div className="flex gap-2 flex-wrap mt-2">
                    {formData.businessTags.map((tag: string, index: number) => (
                        <span key={index} className="px-3 py-1 border border-[#7F513A] rounded-full text-[#7F513A]">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Divider */}
                <hr className="border-t-2 border-[#7F513A] my-4" />

                {/* Logo & Banner Images */}
                <p className="text-[#7F513A] font-semibold">Logo Image:</p>
                <Image src={formData.logo} alt="Business Logo" width={150} height={150} className="rounded-md mt-2" />

                {/* Divider */}
                <hr className="border-t-2 border-[#7F513A] my-4" />

                <p className="text-[#7F513A] font-semibold mt-4">Banner Image:</p>
                <Image src={formData.banner} alt="Business Banner" width={300} height={150} className="rounded-md mt-2" />
            </div>

            {/* Review Loyalty Plan Structure */}
            <div className="flex flex-col w-[700px] mt-6 border border-[#7F513A] rounded-lg p-4">
                <h2 className="text-[22px] font-semibold text-[#E58D6D]">REVIEW LOYALTY PLAN STRUCTURE</h2>

                <p className="text-[#7F513A] mt-4">Points per $: {formData.pointsPerDollar} points for $1</p>

                {/* Tiered Reward Display */}
                <div className="mt-4">
                    {formData.loyaltyRewards.map((tier: string[], tierIndex: number) => (
                        <div key={tierIndex} className="border-b border-[#7F513A] pb-4 mb-4">
                            <p className="text-[#7F513A] font-semibold">Tier {tierIndex + 1} Options:</p>
                            <div className="mt-2 space-y-2">
                                {tier.map((reward: string, index: number) => (
                                    <p key={index} className="text-[#7F513A]">
                                        <span className="font-semibold">Option #{index + 1}:</span> {reward || "N/A"}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Toggle to Disable */}
                <div className="flex items-center justify-between mt-4">
                    <p className="text-[#7F513A] font-semibold">Disable Loyalty Rewards</p>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={disableLoyalty}
                            onChange={() => setDisableLoyalty(!disableLoyalty)}
                            className="sr-only peer"
                        />
                        <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-[#E58D6D] peer-checked:after:translate-x-6 after:content-[''] after:absolute after:left-1 after:top-1 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all"></div>
                    </label>
                </div>
            </div>

            {/* Review Milestone Plan Structure */}
            <div className="flex flex-col w-[700px] mt-6 border border-[#7F513A] rounded-lg p-4">
                <h2 className="text-[22px] font-semibold text-[#E58D6D]">REVIEW MILESTONE PLAN STRUCTURE</h2>

                <p className="text-[#7F513A] mt-4">Visits until next tier: {formData.visitsUntilNextTier}</p>

                {/* Tier Rewards (Separate rows) */}
                <div className="mt-4">
                    <p className="text-[#7F513A] font-semibold">Milestone Reward Options:</p>
                    <div className="mt-2 space-y-2">
                        {formData.milestoneRewards.map((reward: string, index: number) => (
                            <p key={index} className="text-[#7F513A] border-b border-[#7F513A] pb-2">Option #{index + 1}: {reward || "N/A"}</p>
                        ))}
                    </div>
                </div>

                {/* Toggle to Disable */}
                <div className="flex items-center justify-between mt-4">
                    <p className="text-[#7F513A] font-semibold">Disable Milestone Rewards</p>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={disableMilestone}
                            onChange={() => setDisableMilestone(!disableMilestone)}
                            className="sr-only peer"
                        />
                        <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-[#E58D6D] peer-checked:after:translate-x-6 after:content-[''] after:absolute after:left-1 after:top-1 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all"></div>
                    </label>
                </div>
            </div>

            {/* Confirm Button */}
            <p className="text-[#7F513A] italic mt-6">Everything looks good?</p>
            <button
                className="px-4 py-2 text-white rounded-lg mt-4 mb-16 cursor-pointer w-60"
                style={{ backgroundColor: color_pallete[3] }}
                onClick={submitFormAction}
            >
                Confirm Details
            </button>

        </div>
    );
}

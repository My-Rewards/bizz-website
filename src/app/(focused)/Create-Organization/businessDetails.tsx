"use client";
import Image from "next/image";
import MyRewardsLogo from "@/assets/MyRewardsLogo3(2).svg";
import UploadIcon from "@/assets/upload.svg"; // Upload icon
import PhoneImage from "@/assets/phone.svg"; // Phone illustration
import { color_pallete } from "@/static/colors";

export default function BusinessDetails({
                                            nextStepAction,
                                            formData,
                                            setFormDataAction,
                                        }: {
    nextStepAction: () => void;
    formData: any;
    setFormDataAction: React.Dispatch<React.SetStateAction<any>>;
}) {


    const tagOptions = [
        "Cafe", "Health Food", "Organic", "Bakery", "Vegan", "Food Truck",
        "Family-Owned", "Brunch Spot", "Local Ingredients", "Farm-to-Table"
    ];


    const handleTagSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newTag = event.target.value;
        if (newTag && !formData.businessTags.includes(newTag) && formData.businessTags.length < 3) {
            setFormDataAction((prev: any) => ({
                ...prev,
                businessTags: [...prev.businessTags, newTag]
            }));
        }
    };


    const removeTag = (tag: string) => {
        setFormDataAction((prev: any) => ({
            ...prev,
            businessTags: prev.businessTags.filter((t: string) => t !== tag)
        }));
    };


    // Handle File Upload for Logo & Banner
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: "logo" | "banner") => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setFormDataAction((prev: any) => ({
                    ...prev,
                    [type]: reader.result
                }));
            };
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-6 items-center relative">

            {/* Logo */}
            <Image
                src={MyRewardsLogo}
                alt="My Rewards Logo"
                width={292}
                height={58}
                priority
                className="mt-[50px]"
            />

            {/* Section: Title, Line, & Required Field Text */}
            <div className="flex flex-col w-[700px] mt-[50px]">
                <div className="flex items-center">
                    {/* Left-Aligned Title */}
                    <h2 className="text-[22px] font-semibold tracking-[0%] text-[#7F513A] whitespace-nowrap">
                        ENTER ORGANIZATION DETAILS
                    </h2>
                    {/* Aesthetic Line (Right of Title) */}
                    <div className="ml-4 flex-1 border-[3px] border-[#7F513A] h-0"></div>
                </div>

                {/* Required Field Indicator (Directly Below) */}
                <p className="text-[16px] leading-[21.86px] italic text-[#7F513A] mt-2">
                    <span className="text-red-700">*</span> indicates a required field
                </p>
            </div>

            {/* Business Name Field */}
            <div className="flex flex-col w-[700px] mt-4">
                <label className="text-[#7F513A] text-[18px]">
                    <span className="text-red-700">*</span> Business Name
                </label>
                <input
                    type="text"
                    placeholder="Business Name"
                    value={formData.businessName} // Uses formData
                    onChange={(e) => setFormDataAction((prev: any) => ({
                        ...prev,
                        businessName: e.target.value
                    }))} // Updates formData
                    className="mt-2 w-full h-[50px] px-4 border border-[#7F513A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7F513A] bg-transparent text-[#7F513A]"
                />
            </div>

            {/* Business Description Field */}
            <div className="flex flex-col w-[700px] mt-4">
                <label className="text-[#7F513A] text-[18px]">
                    <span className="text-red-700">*</span> Business Description
                    <span className="text-[#E58D6D] italic text-[16px]"> (xxx characters max)</span>
                </label>
                <textarea
                    placeholder="Business Description"
                    value={formData.businessDescription} // Use formData
                    onChange={(e) => setFormDataAction((prev: any) => ({
                        ...prev,
                        businessDescription: e.target.value
                    }))} // Update formData
                    className="mt-2 w-full h-[100px] px-4 py-2 border border-[#7F513A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7F513A] bg-transparent text-[#7F513A] resize-none"
                />
            </div>

            {/* Business Tags Section */}
            <div className="flex flex-col w-[700px] mt-4">
                <label className="text-[#7F513A] text-[18px] ">
                    <span className="text-red-700">*</span> Business Tags
                    <span className="text-[#E58D6D] italic text-[16px]"> (choose up to 3)</span>
                </label>

                {/* Dropdown for selecting tags */}
                <select
                    onChange={handleTagSelect}
                    className="mt-2 w-full h-[50px] px-4 border border-[#7F513A] rounded-md bg-transparent text-[#7F513A] cursor-pointer"
                >
                    <option value="">Select a tag</option>
                    {tagOptions.map((tag) => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>

                {/* Display Selected Tags */}
                <div className="flex gap-2 flex-wrap mt-2">
                    {formData.businessTags.map((tag: string) => (
                        <div key={tag}
                             className="flex items-center px-4 py-2 border border-[#7F513A] rounded-full text-[#7F513A]">
                            {tag}
                            <button onClick={() => removeTag(tag)} className="ml-2 text-red-700 font-bold">×</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Logo, Banner, and Phone Upload Section */}
            <div className="flex w-[700px] mt-4 items-start">
                {/* Left Side: Logo & Banner */}
                <div className="flex flex-col gap-4">
                    {/* Logo Upload */}
                    <div className="flex flex-col w-[300px]">
                        <label className="text-[#7F513A] text-[18px]">
                            <span className="text-red-700">*</span> Logo Image
                            <span className="text-[#E58D6D] italic text-[16px]"> (XXXxXXXpx)</span>
                        </label>
                        <label
                            className="mt-2 flex flex-col items-center justify-center w-full h-[150px] border border-[#7F513A] rounded-md cursor-pointer">
                            {formData.logo ? (
                                <Image src={formData.logo} alt="Business Logo" width={150} height={150}
                                       className="rounded-md"/>
                            ) : (
                                <>
                                    <Image src={UploadIcon} alt="Upload Icon" width={40} height={40}/>
                                    <p className="text-[#7F513A] mt-2">Drag image here</p>
                                </>
                            )}
                            <input type="file" accept="image/*" className="hidden"
                                   onChange={(e) => handleFileChange(e, "logo")}/>
                        </label>

                    </div>

                    {/* Banner Upload */}
                    <div className="flex flex-col w-[500px]">
                        <label className="text-[#7F513A] text-[18px]">
                            <span className="text-red-700">*</span> Banner Image
                            <span className="text-[#E58D6D] italic text-[16px]"> (XXXxXXXpx)</span>
                        </label>
                        <label
                            className="mt-2 flex flex-col items-center justify-center w-full h-[150px] border border-[#7F513A] rounded-md cursor-pointer">
                            {formData.banner ? (
                                <Image src={formData.banner} alt="Business Banner" width={300} height={150}
                                       className="rounded-md"/>
                            ) : (
                                <>
                                    <Image src={UploadIcon} alt="Upload Icon" width={40} height={40}/>
                                    <p className="text-[#7F513A] mt-2">Drag image here</p>
                                </>
                            )}
                            <input type="file" accept="image/*" className="hidden"
                                   onChange={(e) => handleFileChange(e, "banner")}/>
                        </label>

                    </div>
                </div>

                {/* Right Side: Phone Image */}
                <div className="ml-6">
                    <Image src={PhoneImage} alt="Phone Reference" width={250} height={500}/>
                </div>
            </div>

            {/* Next Button with Extra Space Below */}
            {/* Next Button with Extra Space Below */}
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

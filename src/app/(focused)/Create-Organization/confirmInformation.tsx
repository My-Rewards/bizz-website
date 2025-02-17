export default function ConfirmInformation({ prevStep }: { prevStep: () => void }) {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-[#7F513A] text-[30px] font-semibold">Confirm Your Information</h2>
            <p>Review your details before submitting.</p>

            <button onClick={prevStep} className="px-6 py-3 text-white rounded-lg bg-gray-500 mt-4">Back</button>
        </div>
    );
}

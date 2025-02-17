export default function LoyaltyStructure({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-[#7F513A] text-[30px] font-semibold">Loyalty Structure</h2>
            <p>Define how your business handles loyalty rewards.</p>

            <button onClick={nextStep} className="px-6 py-3 text-white rounded-lg bg-[#7F513A] mt-4">Next</button>
        </div>
    );
}

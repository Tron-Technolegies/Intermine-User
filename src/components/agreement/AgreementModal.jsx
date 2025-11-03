import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import SignatureCanvas from "react-signature-canvas";

export default function AgreementModal({ agreement, onClose }) {
  const sigRef = useRef();
  const [signed, setSigned] = useState(false);

  const handleClear = () => sigRef.current.clear();

  const handleSave = () => {
    if (!sigRef.current.isEmpty()) {
      const signature = sigRef.current.toDataURL();
      console.log("Signature saved:", signature);
      setSigned(true);

      // Close modal after signing (optional)
      setTimeout(() => onClose(), 1200);
    }
  };
  const handleSubmitSignature = () => {
    if (!sigRef.current.isEmpty()) {
      const signature = sigRef.current.toDataURL();
      console.log("Signature saved:", signature);
      setSigned(true);
      setTimeout(() => onClose(), 1200);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-black">
          <IoClose size={24} />
        </button>

        {/* Scroll Area */}
        <div className="px-6 py-6 space-y-8 flex-1 overflow-y-auto">
          {/* Header */}
          <div className="bg-[#2B347A] space-y-3 p-6 text-center rounded-lg w-full">
            <p className="text-white font-semibold text-lg">{agreement.title}</p>
            <p className="text-white text-sm">Agreement No: MA-2024-001847</p>
          </div>

          {/* Client Info */}
          <div className="bg-[#F9F9FA] border border-[#D2D2D2] rounded p-6">
            <div className="space-y-4 py-4">
              <div>
                <p className="font-semibold text-black mb-1">Client / Company Name:</p>
                <input
                  type="text"
                  defaultValue="Intermine"
                  className="border border-[#C2C8CF] w-full md:w-[50%] px-4 rounded-lg py-2 bg-white text-black focus:outline-[#2B91E1]"
                />
              </div>

              <div>
                <p className="font-semibold text-black mb-1">Address:</p>
                <input
                  type="text"
                  defaultValue="1234 Blockchain Ave, Crypto City, GC 12345"
                  className="border border-[#C2C8CF] w-full md:w-[50%] px-4 rounded-lg py-2 bg-white text-black focus:outline-[#2B91E1]"
                />
              </div>
            </div>

            <div className="border border-[#D2D2D2] p-6 rounded-lg bg-gray-50 text-sm leading-relaxed space-y-5">
              <div>
                <p className="font-bold text-black">1. Purpose</p>
                <ul className="list-disc ml-6 text-gray-700">
                  <li>The company provides cryptocurrency mining services</li>
                  <li>The user participates under the company's rules</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-black">2. User Commitments</p>
                <ul className="list-disc ml-6 text-gray-700">
                  <li>Provide accurate information</li>
                  <li>Follow platform rules and legal regulations</li>
                  <li>No fraudulent or malicious activities</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-black">3. Company Responsibilities</p>
                <ul className="list-disc ml-6 text-gray-700">
                  <li>Provide stable mining operations</li>
                  <li>Fair reward distribution</li>
                  <li>Notify users on major changes</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-black">4. Payments & Rewards</p>
                <ul className="list-disc ml-6 text-gray-700">
                  <li>Rewards are credited after applicable fees/taxes</li>
                  <li>Payout schedule follows company policy</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-black">5. Termination</p>
                <ul className="list-disc ml-6 text-gray-700">
                  <li>Either party may terminate with notice</li>
                  <li>Immediate termination for violations</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-black">6. Liability</p>
                <ul className="list-disc ml-6 text-gray-700">
                  <li>Company is not responsible for losses beyond control</li>
                  <li>Including hacks, legal changes, global events</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-black">7. Governing Law</p>
                <ul className="list-disc ml-6 text-gray-700">
                  <li>This agreement follows governing laws of jurisdiction</li>
                </ul>
              </div>
            </div>

            {/* Signature Section */}
            <div className="border-2 border-dashed border-[#2B91E1] bg-[#ECF8FF] rounded-2xl p-6 mt-6">
              <h3 className="text-center text-[#2B91E1] font-semibold text-lg mb-6">
                Digital Signatures
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* User Signature */}
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-gray-800 mb-2">User (Miner)</p>

                  <SignatureCanvas
                    ref={sigRef}
                    penColor="black"
                    canvasProps={{
                      className: "border border-[#2B91E1] w-full h-28 rounded-lg bg-white",
                    }}
                  />

                  <button
                    onClick={handleClear}
                    className="text-xs text-white bg-red-500 hover:bg-red-600 rounded-full px-4 py-1 w-fit self-center"
                  >
                    Clear
                  </button>

                  <div className="mt-2 text-sm text-gray-700 space-y-1">
                    <p>Name: -</p>
                    <p>Date: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Company Signature */}
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-gray-800 mb-2">Company Representative</p>

                  <img
                    src="/signature-placeholder.png"
                    className="border border-[#2B91E1] w-full h-28 rounded-lg bg-white object-contain p-2"
                    alt="Company Signature"
                  />

                  <div className="mt-2 text-sm text-gray-700 space-y-1">
                    <p>Name: CEO</p>
                    <p>Date: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Checkbox */}
              <label className="flex items-center gap-2 mt-6 text-sm text-gray-700">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-400" />I confirm that
                I have read, understood, and agree to all terms and conditions.
              </label>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-4 mt-6 pt-4 border-t">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmitSignature}
                className="px-6 py-2 rounded-xl bg-[#2B91E1] text-white font-medium hover:bg-[#1f78c0] transition"
              >
                Sign & Submit Agreement
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

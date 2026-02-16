import React, { useContext, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useGetSingleAgreement } from "../../hooks/agreements/useGetSingleAgreement";
import Loading from "../Loading";
import Modal from "@mui/material/Modal";
import { IoClose } from "react-icons/io5";
import SignatureCanvas from "react-signature-canvas";
import { UserContext } from "../../UserContext";
import { useSignSignature } from "../../hooks/agreements/useSignSignature";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  overflowY: "scroll",
  boxShadow: 24,
  p: 4,
};

export default function AgreementPopup({ open, handleClose, id }) {
  const {
    isLoading,
    isError,
    error,
    data: agreement,
  } = useGetSingleAgreement({ id });
  const { user } = useContext(UserContext);
  const { isPending, mutateAsync } = useSignSignature();
  const sigCanvasRef = useRef(null);
  const [checked, setChecked] = useState(false);

  const handleClear = () => {
    sigCanvasRef.current.clear();
  };

  async function handleSubmitSignature() {
    if (!checked) {
      toast.warn("Please agree to the terms");
      return;
    }
    if (sigCanvasRef.current.isEmpty()) {
      toast.warn("Please provide your signature");
      return;
    }
    const signatureBase64 = sigCanvasRef.current.toDataURL("image/png");
    const data = {
      agreementId: agreement._id,
      signature: signatureBase64,
      heading: `Hosting Agreement between Intermine Solutions GmbH, having its registered office at Tal 44, 80331 Munich, represented by the managing directors Alexander Meier and Matthieu Winckel (hereinafter referred to as the "Hoster") and ${user.clientName} (hereinafter referred to as the "Customer")`,
    };
    await mutateAsync(data);
    handleClose();
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style }}>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <p>{error.message}</p>
        ) : (
          <div className="bg-white rounded-xl w-full overflow-hidden flex flex-col relative">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-0 right-0 text-gray-600 hover:text-black"
            >
              <IoClose size={24} />
            </button>

            {/* Scroll Area */}
            <div className="md:px-6 md:py-6 space-y-8 flex-1 overflow-y-auto">
              {/* Header */}
              <div className="bg-[#2B347A] space-y-3 p-6 text-center rounded-lg w-full">
                <p className="text-white font-semibold text-lg">
                  {/* {agreement.title} */}
                </p>
                <p className="text-white text-sm">
                  Agreement No: AG-{agreement._id}
                </p>
              </div>

              {/* Client Info */}
              <div className="bg-[#F9F9FA] border border-[#D2D2D2] rounded p-6">
                <div className="space-y-4 py-4">
                  <div>
                    <p className="font-semibold text-black mb-1">
                      Client / Company Name:
                    </p>
                    <input
                      type="text"
                      disabled
                      value={user?.companyName}
                      className="border border-[#C2C8CF] w-full md:w-[50%] px-4 rounded-lg py-2 bg-white text-black focus:outline-[#2B91E1]"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-black mb-1">Address:</p>
                    <input
                      type="text"
                      disabled
                      value={`${user.address.street} ${user.address.city} ${user.address.state} ${user.address.country}`}
                      className="border border-[#C2C8CF] w-full md:w-[50%] px-4 rounded-lg py-2 bg-white text-black focus:outline-[#2B91E1]"
                    />
                  </div>
                </div>

                <div className="border border-[#D2D2D2] p-6 rounded-lg bg-gray-50 text-sm leading-relaxed space-y-5">
                  <div className="text-sm leading-relaxed space-y-5 agreement-content">
                    <h1>Hosting Agreement</h1>
                    <div className="agreement-content">
                      Hosting Agreement between Intermine Solutions GmbH, having
                      its registered office at Tal 44, 80331 Munich, represented
                      by the managing directors Alexander Meier and Matthieu
                      Winckel (hereinafter referred to as the "Hoster") and{" "}
                      {user.clientName} (hereinafter referred to as the
                      "Customer")
                    </div>
                  </div>
                  <div
                    className="text-sm leading-relaxed space-y-5 agreement-content"
                    dangerouslySetInnerHTML={{ __html: agreement.content }}
                  ></div>
                </div>

                {/* Signature Section */}

                <>
                  <div className="border-2 border-dashed border-[#2B91E1] bg-[#ECF8FF] rounded-2xl p-6 mt-6">
                    <h3 className="text-center text-[#2B91E1] font-semibold text-lg mb-6">
                      Digital Signatures
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* User Signature */}
                      <div className="flex flex-col gap-2">
                        <p className="font-medium text-gray-800 mb-2">
                          Client Signature
                        </p>

                        <SignatureCanvas
                          ref={sigCanvasRef}
                          penColor="black"
                          canvasProps={{
                            className:
                              "border border-[#2B91E1] w-full h-28 rounded-lg bg-white",
                          }}
                        />

                        <button
                          onClick={handleClear}
                          className="text-xs text-white bg-red-500 hover:bg-red-600 rounded-full px-4 py-1 w-fit self-center"
                        >
                          Clear
                        </button>

                        <div className="mt-2 text-sm text-gray-700 space-y-1">
                          <p>Name: {user.clientName}</p>
                          <p>Date: {new Date().toLocaleDateString()}</p>
                        </div>
                      </div>

                      {/* Company Signature */}
                      <div className="flex flex-col gap-2">
                        <p className="font-medium text-gray-800 mb-2">
                          Company Representative
                        </p>
                        <div className="border border-[#2B91E1] flex items-center justify-center w-full h-28 rounded-lg bg-white object-contain p-2">
                          <img
                            src="/logo-mobile.png"
                            alt="Company Signature"
                            className="w-[200px]"
                          />
                        </div>

                        <div className="mt-2 text-sm text-gray-700 space-y-1">
                          <p>Name: Alexander Meier, Matthieu Winckel</p>
                          <p>Date: {new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Checkbox */}
                    <label className="flex items-center gap-2 mt-6 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-400"
                      />
                      I confirm that I have read, understood, and agree to all
                      terms and conditions.
                    </label>
                  </div>

                  {/* Footer Buttons */}
                  <div className="flex md:flex-row flex-col justify-end gap-4 mt-6 pt-4 border-t">
                    <button
                      onClick={handleClose}
                      className="px-6 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleSubmitSignature}
                      disabled={isPending}
                      className="px-6 py-2 rounded-xl bg-[#2B91E1] text-white font-medium hover:bg-[#1f78c0] transition"
                    >
                      {isPending ? "Submitting..." : "Sign & Submit Agreement"}
                    </button>
                  </div>
                </>
              </div>
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
}

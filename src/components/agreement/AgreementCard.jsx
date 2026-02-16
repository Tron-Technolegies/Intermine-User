import { useState } from "react";
import { IoMdDocument } from "react-icons/io";
import AgreementPopup from "./AgreementPopup";
import { useDownloadPdf } from "../../hooks/agreements/useDownloadPdf";
import { toast } from "react-toastify";

export default function AgreementCard({ agreement }) {
  const date = new Date(agreement.issuedOn).toLocaleString();
  const [open, setOpen] = useState(false);
  const { isPending, mutateAsync } = useDownloadPdf();

  async function handleDownload() {
    try {
      const blob = await mutateAsync(agreement._id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `agreement-${agreement._id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download");
    }
  }

  return (
    <div className="border border-[#C2C2C2] rounded-lg p-6 bg-[#F9F9FA] cursor-pointer hover:shadow-sm transition">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <IoMdDocument className="text-[#00000040] h-8 w-8" />
          <div>
            <p className="font-medium">{agreement.agreementType}</p>
            <p className="text-[#818181] text-sm">Sent: {date}</p>
          </div>
        </div>

        <div className="flex gap-2">
          {!agreement.signed && (
            <button
              onClick={() => setOpen(true)}
              className="bg-white text-black py-2 px-4 rounded-lg border border-[#3893D0] text-sm"
            >
              View/Sign
            </button>
          )}

          {agreement.signed && (
            <>
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg text-sm">
                Signed
              </button>
              <button
                disabled={isPending}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm cursor-pointer"
                onClick={handleDownload}
              >
                {isPending ? "Downloading..." : "Download"}
              </button>
            </>
          )}
        </div>
      </div>
      <AgreementPopup
        open={open}
        handleClose={() => setOpen(false)}
        id={agreement._id}
      />
    </div>
  );
}

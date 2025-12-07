import { IoMdDocument } from "react-icons/io";

export default function AgreementCard({ agreement, onOpen }) {
  const date = new Date(agreement.issuedOn).toLocaleDateString();

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
          <button
            onClick={onOpen}
            className="bg-white text-black py-2 px-4 rounded-lg border border-[#3893D0] text-sm"
          >
            View/Sign
          </button>

          {agreement.signed ? (
            <button className="bg-green-600 text-white py-2 px-4 rounded-lg text-sm">Signed</button>
          ) : (
            <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg text-sm">
              Pending
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

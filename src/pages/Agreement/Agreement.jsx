import React, { useState } from "react";
import AgreementCard from "../../components/agreement/AgreementCard";
import AgreementModal from "../../components/agreement/AgreementModal";

export default function Agreement() {
  const [selectedAgreement, setSelectedAgreement] = useState(null);

  const agreements = [
    { id: 1, title: "Mining Agreement V1", date: "12 Sept 2025" },
    { id: 2, title: "Purchase Agreement V1", date: "12 Sept 2025" },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-4 bg-white rounded-lg min-h-screen">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4">My Agreements</h1>

      <div className="space-y-3">
        {agreements.map((item) => (
          <div key={item.id} onClick={() => setSelectedAgreement(item)}>
            <AgreementCard title={item.title} date={item.date} />
          </div>
        ))}
      </div>

      {selectedAgreement && (
        <AgreementModal agreement={selectedAgreement} onClose={() => setSelectedAgreement(null)} />
      )}
    </div>
  );
}

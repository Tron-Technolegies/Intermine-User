import React, { useEffect, useState } from "react";
import api from "../../api/api";
import AgreementCard from "../../components/agreement/AgreementCard";
import AgreementModal from "../../components/agreement/AgreementModal";
import { toast } from "react-toastify";

export default function AgreementPage() {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgreement, setSelectedAgreement] = useState(null);

  // Fetch agreements
  const getUserAgreements = async () => {
    try {
      const res = await api.get("/agreement/user", { withCredentials: true });
      setAgreements(res.data.agreements || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load agreements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserAgreements();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Your Agreements</h1>

      {loading ? (
        <p>Loading agreements...</p>
      ) : agreements.length === 0 ? (
        <p>No agreements found.</p>
      ) : (
        agreements.map((ag) => (
          <AgreementCard key={ag._id} agreement={ag} onOpen={() => setSelectedAgreement(ag)} />
        ))
      )}

      {/* Modal */}
      {selectedAgreement && (
        <AgreementModal
          agreement={selectedAgreement}
          onClose={() => {
            setSelectedAgreement(null);
            getUserAgreements(); // refresh list after signing
          }}
        />
      )}
    </div>
  );
}

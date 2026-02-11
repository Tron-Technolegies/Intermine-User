import React, { useEffect, useState } from "react";
import AgreementCard from "../../components/agreement/AgreementCard";
import Loading from "../../components/Loading";
import { useGetAgreements } from "../../hooks/agreements/useGetAgreements";

export default function AgreementPage() {
  const { isError, isLoading, error, data: agreements } = useGetAgreements();
  return isLoading ? (
    <Loading />
  ) : isError ? (
    <p>{error.message}</p>
  ) : (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Your Agreements</h1>

      {isLoading ? (
        <Loading />
      ) : agreements.length === 0 ? (
        <p>No agreements found.</p>
      ) : (
        agreements.map((ag) => <AgreementCard key={ag._id} agreement={ag} />)
      )}
    </div>
  );
}

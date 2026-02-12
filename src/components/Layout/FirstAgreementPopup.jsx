import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useGetAgreements } from "../../hooks/agreements/useGetAgreements";
import { UserContext } from "../../UserContext";
import Loading from "../Loading";
import AgreementCard from "../agreement/AgreementCard";
import { useCheckAgreement } from "../../hooks/agreements/useCheckAgreements";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90vh",
  bgcolor: "background.paper",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "15px",
  p: 4,
  //   background: `linear-gradient(135deg, #1e3c72, #2a5298)`,
  //   backdropFilter: `blur(10px)`,
  borderRadius: "8px",
};

export default function FirstAgreementPopup({ open, handleClose }) {
  const { isError, isLoading, error, data: agreements } = useGetAgreements();
  const { isPending, mutateAsync } = useCheckAgreement();
  const { user } = useContext(UserContext);

  async function handleContinue() {
    try {
      await mutateAsync();
      handleClose();
    } catch (error) {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          "something went wrong",
      );
    }
  }
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ fontWeight: 700, fontSize: 24 }}
        >
          Welcome {user?.clientName}
        </Typography>
        <div className="flex flex-col gap-3">
          <p>Please sign the hosting agreements to continue</p>
          {isLoading ? (
            <Loading />
          ) : isError ? (
            <p>{error.message}</p>
          ) : (
            agreements.map((item) => (
              <AgreementCard key={item._id} agreement={item} />
            ))
          )}
        </div>
        <button
          disabled={isPending}
          onClick={handleContinue}
          className="bg-blue-800 hover:bg-blue-500 duration-300 ease-in-out py-2 px-6 rounded-md text-sm  mt-5 cursor-pointer text-white"
        >
          {isPending ? "....." : "Continue"}
        </button>
      </Box>
    </Modal>
  );
}

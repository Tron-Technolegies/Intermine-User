import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { UserContext } from "../../UserContext";
import { GoCpu, GoDotFill } from "react-icons/go";
import { TfiAnnouncement } from "react-icons/tfi";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { FaFileSignature } from "react-icons/fa6";
import { MdAccountBox } from "react-icons/md";
import { useAcceptTerms } from "../../hooks/useAcceptTerms";
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
  background: `linear-gradient(135deg, #1e3c72, #2a5298)`,
  backdropFilter: `blur(10px)`,
  borderRadius: "8px",
  color: "white",
};

export default function FirstPopup({ open, handleClose }) {
  const { user } = useContext(UserContext);
  const listClass = "flex gap-4 items-center";
  const { isPending, mutateAsync } = useAcceptTerms();
  const [firstAgree, setFirstAgree] = useState(false);
  const [secondAgree, setSecondAgree] = useState(false);
  const [thirdAgree, setThirdAgree] = useState(false);

  async function handleContinue() {
    try {
      if (!firstAgree || !secondAgree || !thirdAgree) {
        toast.warn("Please agree all terms before continue");
        return;
      }
      await mutateAsync();
      handleClose();
    } catch (error) {
      toast(error.message);
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
        <div className="flex flex-col gap-3 leading-relaxed max-w-[750px]">
          <p>Welcome to your personalized Intermine Dashboard.</p>
          <p>
            This platform has been designed to give you complete visibility and
            control over your mining operations.
          </p>
          <p>From here, you can:</p>
          <ul className="ml-5 flex flex-col gap-2">
            <li className={listClass}>
              <GoCpu size={24} />
              Manage your miners and monitor their current status
            </li>
            <li className={listClass}>
              <TfiAnnouncement size={24} />
              Track important updates and informations from hosting locations
            </li>
            <li className={listClass}>
              <AiOutlineIssuesClose size={24} />
              Report issues and follow their progress until resolution
            </li>
            <li className={listClass}>
              <FaFileSignature size={24} />
              View and sign hosting agreements securely
            </li>
            <li className={listClass}>
              <MdAccountBox size={24} />
              Access important account-related information anytime
            </li>
          </ul>
          <p>
            Your dashboard is built to ensure transparency, efficiency, and a
            smooth mining experience. If you need assistance at any point, your
            dedicated Account Manager is always available to support you.
          </p>
          <p>
            We’re excited to have you onboard and look forward to supporting
            your mining journey with Intermine
          </p>
          <div className="text-xs flex flex-col gap-2">
            <div className={listClass}>
              <input
                type="checkbox"
                id="first"
                checked={firstAgree}
                onChange={(e) => setFirstAgree(e.target.checked)}
              />
              <label htmlFor="first">
                I accept the General Terms and Conditions (AGB) of Intermine
                Solutions.
              </label>
            </div>
            <div className={listClass}>
              <input
                type="checkbox"
                id="second"
                checked={secondAgree}
                onChange={(e) => setSecondAgree(e.target.checked)}
              />
              <label htmlFor="second">
                I accept the Dashboard Usage Agreement.
              </label>
            </div>
            <div className={listClass}>
              <input
                type="checkbox"
                id="third"
                checked={thirdAgree}
                onChange={(e) => setThirdAgree(e.target.checked)}
              />
              <label htmlFor="third" className="leading-relaxed">
                And I confirm that I have read the Privacy Policy. I agree that
                my data will be processed in accordance with the Privacy Policy
                for the provision and administration of the dashboard.
              </label>
            </div>
          </div>
        </div>
        <button
          disabled={isPending}
          onClick={handleContinue}
          className="bg-blue-800 hover:bg-blue-500 duration-300 ease-in-out py-2 px-6 rounded-md text-sm self-end mt-5 cursor-pointer"
        >
          {isPending ? "...." : "Continue"}
        </button>
      </Box>
    </Modal>
  );
}

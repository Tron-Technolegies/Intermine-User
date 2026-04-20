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
import { firstpopupLanguages } from "../../utils/popupLanguageData";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxHeight: "85vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
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
  const [lang, setLang] = useState("de");

  const t = firstpopupLanguages[lang];

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
        <div className="w-full flex justify-end">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-blue-800 p-2 rounded-md text-xs outline-none"
          >
            <option value={"de"}>German</option>
            <option value={"en"}>English</option>
          </select>
        </div>
        <div className="flex flex-col gap-3 leading-relaxed max-w-[750px] relative mt-2">
          <p className="font-bold text-2xl text-center">
            {t.welcome} {user?.clientName}
          </p>
          <p>{t.intro1}</p>
          <p>{t.intro2}</p>
          <p>{t.fromHere}</p>
          <ul className="ml-5 flex flex-col gap-2">
            <li className={listClass}>
              <GoCpu size={24} />
              {t.point1}
            </li>
            <li className={listClass}>
              <TfiAnnouncement size={24} />
              {t.point2}
            </li>
            <li className={listClass}>
              <AiOutlineIssuesClose size={24} />
              {t.point3}
            </li>
            <li className={listClass}>
              <FaFileSignature size={24} />
              {t.point4}
            </li>
            <li className={listClass}>
              <MdAccountBox size={24} />
              {t.point5}
            </li>
          </ul>
          <p>{t.outro1}</p>
          <p>{t.outro2}</p>
          <div className="text-xs flex flex-col gap-2">
            <div className={listClass}>
              <input
                type="checkbox"
                id="first"
                checked={firstAgree}
                onChange={(e) => setFirstAgree(e.target.checked)}
              />
              <label htmlFor="first">
                {t.checkPoint1start}{" "}
                <a
                  href="https://shop.intermine-solutions.de/policies/terms-of-service"
                  target="_blank"
                  className="text-white font-extrabold underline tracking-wide"
                >
                  (AGB)
                </a>{" "}
                {t.checkPoint1end}
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
                {t.checkPoint2start}{" "}
                <a
                  href="/intermine-usage-agreement.pdf"
                  download={"intermine-usage-agreement.pdf"}
                  className="text-white font-extrabold underline tracking-wide"
                >
                  {t.checkPoint2Link}
                </a>
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
                {t.checkPoint3start}{" "}
                <a
                  href="/intermine-privacy-policy.pdf"
                  download={"intermine-privacy-policy.pdf"}
                  className="text-white font-extrabold underline tracking-wide"
                >
                  {t.checkPoint3Link}
                </a>
                . {t.checkPoint3end}
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

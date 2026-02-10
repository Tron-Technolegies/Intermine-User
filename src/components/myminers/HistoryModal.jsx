import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import useIssueMessages from "../../hooks/issues/useIssueMessages";
import { FaMessage } from "react-icons/fa6";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: 500,
  bgcolor: "background.paper",
  overflowY: "scroll",
  boxShadow: 24,
  p: 3,
};

export default function HistoryModal({ open, miner, handleClose }) {
  const history = [
    ...(miner?.issueHistory || []),
    ...(miner?.changeHistory || []),
  ];

  const filteredHistory = history.filter((item) => item.status !== "Resolved");

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Pending Issue Tickets
          </Typography>
          <div className="mt-3">
            {filteredHistory.length === 0 ? (
              <p className="text-gray-500 text-center">No history available</p>
            ) : (
              filteredHistory.reverse().map((item, i) => (
                <div key={i} className="p-3 shadow-md  rounded-lg mb-3">
                  <div className="flex justify-between">
                    <h3 className="font-medium capitalize text-blue-600">
                      {item.type || "Event"}
                    </h3>
                    <p
                      className={`text-xs bg-yellow-100 text-yellow-600 rounded-md px-2 py-1`}
                    >
                      {item.status}
                    </p>
                  </div>
                  {item.type === "repair" && (
                    <p className="text-sm text-gray-600">
                      <b>Issue: </b>
                      {item.issue.issueType || ""}
                    </p>
                  )}
                  {item.type === "change" && (
                    <p className="text-sm text-gray-600 flex flex-col gap-1">
                      <span>
                        <b>Req-Pool :</b> {item.changeRequest.pool}
                      </span>
                      <span>
                        <b>Req-Worker :</b> {item.changeRequest.worker}
                      </span>
                    </p>
                  )}
                  {item.description && (
                    <p className="text-sm text-gray-600 italic">
                      "{item.description || ""}"
                    </p>
                  )}

                  <p className="text-xs text-gray-400 mt-1 italic">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : "—"}
                  </p>
                  <MessagesHistory issueId={item._id} />
                </div>
              ))
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
}

function MessagesHistory({ issueId }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data: messages = [], isLoading } = useIssueMessages(issueId);
  return (
    <div className="mt-3">
      <Button onClick={handleOpen}>
        <FaMessage size={18} style={{ color: "gray" }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            All Messages
          </Typography>
          <div className="mt-3">
            {isLoading ? (
              <p className="text-center text-gray-500">Loading messages...</p>
            ) : messages.length === 0 ? (
              <p className="text-center text-gray-500">No messages found.</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className="shadow-md rounded-lg p-3 mb-3 flex flex-col gap-2 "
                >
                  <p className="text-sm text-gray-700 italic">
                    "{msg.message}"
                  </p>
                  <p className="text-xs text-gray-400 italic">
                    {new Date(msg.sendOn).toLocaleString()}
                  </p>
                  <p className="text-xs font-medium self-end">{msg.sendBy}</p>
                </div>
              ))
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

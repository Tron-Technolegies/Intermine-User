import React from "react";
import useIssueMessages from "../../hooks/issues/useIssueMessages";

export default function IssueMessagesModal({ issueId, onClose }) {
  const { data: messages = [], isLoading } = useIssueMessages(issueId);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-96 max-h-[450px] overflow-y-auto p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Issue Messages</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages found.</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className="shadow-md rounded-lg p-3 mb-3 flex flex-col gap-2"
            >
              <p className="text-sm text-gray-700 italic">"{msg.message}"</p>
              <p className="text-xs text-gray-400 italic">
                {new Date(msg.sendOn).toLocaleString()}
              </p>
              <p className="text-xs font-medium self-end">{msg.sendBy}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

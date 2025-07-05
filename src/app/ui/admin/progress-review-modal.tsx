"use client";
import { useState } from "react";
import { ProgressResponseDTO } from "@/interfaces/progress";
import { approveClientProgress } from "@/actions/admin/approve-progress";
import { disapproveClientProgress } from "@/actions/admin/disapprove-progress";
import { approveProgressFeedback } from "@/actions/admin/approve-progress-feedback";
import { disapproveProgressFeedback } from "@/actions/admin/disapprove-progress-feedback";
import { toast } from "react-toastify";

interface Props {
  progress: ProgressResponseDTO;
  handleClose: () => void;
}

export default function ProgressReviewModal({ progress, handleClose }: Props) {
  const pics = progress.advace_pictures_uris_form;
  const photos = pics ? (Object.values(pics).filter(Boolean) as string[]) : [];

  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const [reasonProgress, setReasonProgress] = useState("");
  const [reasonFeedback, setReasonFeedback] = useState("");
  const [showReasonProgress, setShowReasonProgress] = useState(false);
  const [showReasonFeedback, setShowReasonFeedback] = useState(false);

  const handleApproveProgress = async () => {
    const ok = await approveClientProgress(progress.id);
    if (ok) {
      toast.success("Progress approved successfully");
      window.location.reload();
    } else {
      toast.error("Error approving progress, please try later");
    }
  };

  const handleDisapproveProgress = async () => {
    if (!reasonProgress) return;
    const ok = await disapproveClientProgress(progress.id, reasonProgress);
    if (ok) {
      toast.success("Progress disapproved successfully");
      window.location.reload();
    } else {
      toast.error("Error disapproving progress");
    }
  };

  const handleApproveFeedback = async () => {
    const ok = await approveProgressFeedback(progress.id);
    if (ok) {
      toast.success("Feedback approved successfully");
      window.location.reload();
    } else {
      toast.error("Error approving feedback");
    }
  };

  const handleDisapproveFeedback = async () => {
    if (!reasonFeedback) return;
    const ok = await disapproveProgressFeedback(progress.id, reasonFeedback);
    if (ok) {
      toast.success("Feedback disapproved successfully");
      window.location.reload();
    } else {
      toast.error("Error disapproving feedback");
    }
  };

  return (
    <dialog
      id="review-modal"
      tabIndex={-1}
      aria-hidden="false"
      className="flex bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Progress review
            </h3>
            <button
              onClick={handleClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-6">
            <div>
              <h4 className="text-md font-semibold mb-2 text-gray-700">Images</h4>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {photos.length ? (
                  photos.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`progress-photo-${idx}`}
                      className="w-full h-40 object-cover rounded cursor-pointer"
                      onClick={() => setExpandedImage(src)}
                    />
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No images</p>
                )}
              </div>
              <h4 className="text-md font-semibold mb-2 text-gray-700">Description</h4>
              <p className="text-sm text-gray-600">
                {progress.description_advance || "No description provided."}
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-md font-semibold mb-2 text-gray-700">Client Progress</h4>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={handleApproveProgress}
                    className="text-white bg-jungle-green-600 hover:bg-jungle-green-700 focus:ring-4 focus:outline-none focus:ring-jungle-green-200 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => setShowReasonProgress(!showReasonProgress)}
                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Disapprove
                  </button>
                </div>
                {showReasonProgress && (
                  <div className="flex flex-col gap-2">
                    <textarea
                      className="w-full border rounded p-2"
                      placeholder="Reason"
                      value={reasonProgress}
                      onChange={(e) => setReasonProgress(e.target.value)}
                    ></textarea>
                    <button
                      onClick={handleDisapproveProgress}
                      className="self-end text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm px-4 py-2"
                    >
                      Send
                    </button>
                  </div>
                )}
              </div>
              <div>
                <h4 className="text-md font-semibold mb-2 text-gray-700">Professional Feedback</h4>
                {progress.professional_feedback && (
                  <p className="text-sm text-gray-600 mb-2">
                    {progress.professional_feedback}
                  </p>
                )}
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={handleApproveFeedback}
                    className="text-white bg-jungle-green-600 hover:bg-jungle-green-700 focus:ring-4 focus:outline-none focus:ring-jungle-green-200 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => setShowReasonFeedback(!showReasonFeedback)}
                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Disapprove
                  </button>
                </div>
                {showReasonFeedback && (
                  <div className="flex flex-col gap-2">
                    <textarea
                      className="w-full border rounded p-2"
                      placeholder="Reason"
                      value={reasonFeedback}
                      onChange={(e) => setReasonFeedback(e.target.value)}
                    ></textarea>
                    <button
                      onClick={handleDisapproveFeedback}
                      className="self-end text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm px-4 py-2"
                    >
                      Send
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {expandedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setExpandedImage(null)}
        >
          <img
            src={expandedImage}
            alt="expanded"
            className="max-w-full max-h-full rounded"
          />
        </div>
      )}
    </dialog>
  );
}


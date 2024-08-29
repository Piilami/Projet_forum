import React from "react";
import { useNavigate } from "react-router-dom";
import "./PostInteractions.scss";

const PostInteractions = ({
  onVoteUp,
  onVoteDown,
  onReport,
  onDelete,
  votes = { upvote: 0, downvote: 0 },
  showReportButton,
}) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      navigate("/");
    }
  };

  return (
    <div className="post-interactions">
      <button className="btn-vote" onClick={onVoteUp} aria-label="Upvote">
        +
      </button>
      <p className="vote-count" aria-label="Vote count">
        Upvotes: {votes.upvote} Downvotes: {votes.downvote}
      </p>
      <button className="btn-vote" onClick={onVoteDown} aria-label="Downvote">
        -
      </button>
      {showReportButton && (
        <button className="btn-report" onClick={onReport} aria-label="Report">
          Report
        </button>
      )}
      {onDelete && (
        <button
          className="btn-delete"
          onClick={handleDelete}
          aria-label="Delete"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default PostInteractions;

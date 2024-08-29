import React from "react";
import "./CommentList.scss";

const CommentList = ({ comments }) => {
  return (
    <ul className="comment-list">
      {comments.map((comment, index) => (
        <li key={index} className="comment-item">
          {comment.content}
        </li>
      ))}
    </ul>
  );
};

export default CommentList;

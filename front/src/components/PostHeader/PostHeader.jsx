import React from "react";
import "./PostHeader.scss";

const PostHeader = ({ title, content }) => {
  return (
    <div className="post-header">
      <h2 className="post-title">{title}</h2>
      <p className="post-content">{content}</p>
    </div>
  );
};

export default PostHeader;

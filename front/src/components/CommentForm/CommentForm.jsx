import React from "react";
import "./CommentForm.scss";

const CommentForm = ({ commentContent, onCommentChange, onSubmit }) => {
  return (
    <form className="comment-form" onSubmit={onSubmit}>
      <input
        type="text"
        className="input-comment"
        placeholder="Ajoutez votre commentaire"
        value={commentContent}
        onChange={onCommentChange}
      />
      <button type="submit" className="submit-comment-btn">
        Envoyer
      </button>
    </form>
  );
};

export default CommentForm;

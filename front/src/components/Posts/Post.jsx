import React from "react";
import { Link } from "react-router-dom";
import "../Posts/Post.scss";

const PostItem = ({ post }) => {
  return (
    <Link
      to={`/post/${post._id}`}
      className="forum-post-link"
      aria-label={`Lien vers le post intitulé "${post.title}"`}
    >
      <article className="forum-post">
        <header className="post-header">
          <h3 className="article-title">
            <span className="label">Titre:</span> {post.title}
          </h3>
        </header>
        <div className="container__post">
          <div className="container__content">
            <p className="text">{post.content}</p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PostItem;

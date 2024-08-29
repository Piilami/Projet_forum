import React from "react";
import PostItem from "../Posts/Post";

const PostList = ({ posts }) => {
  if (!Array.isArray(posts) || posts.length === 0) {
    return <p>Aucun post à afficher.</p>;
  }

  return (
    <>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </>
  );
};

export default PostList;

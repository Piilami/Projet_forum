import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  moderatePost,
  approuvePost,
} from "../../redux/reducers/adminReducer";
import ModerateCard from "../ModerateCard/ModerateCard";

const ModeratePost = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleApprove = async (postId) => {
    if (!postId) {
      console.error("postId is undefined");
      return;
    }
    try {
      await dispatch(approuvePost({ postId })).unwrap();
      console.log(`Post with ID ${postId} successfully approved`);
      dispatch(fetchPosts());
    } catch (error) {
      console.error("Failed to approve post:", error);
    }
  };

  const handleReject = async (postId) => {
    if (!postId) {
      console.error("postId is undefined");
      return;
    }
    try {
      await dispatch(moderatePost({ postId })).unwrap();
      console.log(`Post with ID ${postId} successfully rejected`);
    } catch (error) {
      console.error("Failed to reject post:", error);
    }
  };

  if (loading) return <p>Chargement en cours...</p>;
  if (error)
    return <p>Erreur : {error.message || "Une erreur est survenue"}</p>;

  return (
    <div className="moderate-posts">
      {posts.map((post) => (
        <ModerateCard
          key={post._id}
          item={post}
          onApprove={() => handleApprove(post._id)}
          onReject={() => handleReject(post._id)}
        />
      ))}
    </div>
  );
};

export default ModeratePost;

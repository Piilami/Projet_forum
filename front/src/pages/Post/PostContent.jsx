import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostById,
  commentOnPostById,
  voteOnPost,
  deletePostById,
  reportPost,
} from "../../redux/reducers/postReducer";
import PostInteractions from "../../components/PostInteractions/PostInteractions";
import PostHeader from "../../components/PostHeader/PostHeader";
import CommentForm from "../../components/CommentForm/CommentForm";
import CommentList from "../../components/CommentList/CommentList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./PostContent.scss";
import { useParams } from "react-router-dom";

const PostContent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    selectedPost: post,
    loading,
    error,
  } = useSelector((state) => state.posts);
  const loggedInUserId = useSelector((state) => state.auth.user?._id);
  const [commentContent, setCommentContent] = useState("");
  const [reportContext, setReportContext] = useState("aeaezazzezaz");

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [id, dispatch]);

  const handleCommentChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    if (post && commentContent.trim()) {
      dispatch(
        commentOnPostById({
          postId: post._id,
          commentData: { content: commentContent },
        })
      );
      setCommentContent("");
    }
  };

  const handleVote = (voteType) => {
    dispatch(voteOnPost({ postId: id, voteType }));
  };

  const handleDelete = () => {
    if (post) {
      dispatch(deletePostById(post._id));
    }
  };

  const handleReport = () => {
    console.log("Report button clicked with context:", reportContext);
    if (post && reportContext.trim()) {
      dispatch(
        reportPost({
          postId: post._id,
          context: reportContext,
        })
      );
      setReportContext("");
    }
  };

  if (loading) return <Loader />;
  if (error)
    return <ErrorMessage message={error.message || "An error occurred"} />;
  if (!post)
    return <ErrorMessage message="Post not found or has not been loaded yet" />;

  const isAuthor = post.author && post.author.id === loggedInUserId;

  return (
    <main className="main__post">
      <div className="post-container">
        <PostInteractions
          onVoteUp={() => handleVote("upvote")}
          onVoteDown={() => handleVote("downvote")}
          onReport={handleReport}
          onDelete={isAuthor ? handleDelete : null}
          votes={{
            upvote: post.votes.upvote.length,
            downvote: post.votes.downvote.length,
          }}
          showReportButton={!isAuthor}
        />
        <div className="post-content">
          <PostHeader
            title={post.title || "No Title"}
            content={post.content || "No Content"}
          />
          <CommentForm
            commentContent={commentContent}
            onCommentChange={handleCommentChange}
            onSubmit={handleSubmitComment}
          />
          <CommentList comments={post.responses || []} />
        </div>
      </div>
    </main>
  );
};

export default PostContent;

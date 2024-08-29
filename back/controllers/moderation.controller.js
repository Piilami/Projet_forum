import Post from "../models/Posts.js";
import User from "../models/User.js";
import { PostModeration, UserModeration } from "../models/Moderation.js";

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModeration.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await PostModeration.findByIdAndDelete(post);
    await Post.findByIdAndDelete(post.post._id);
    return res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

const approuvePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModeration.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await PostModeration.findByIdAndDelete(postId);
    return res.status(200).json({ message: "Post gracié" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

const banUser = async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.status = "banned";
    await user.save();
    await UserModeration.deleteOne({ user: req.params._id });
    return res.status(200).json({ message: "User banned" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

const reportPost = async (req, res) => {
  try {
    const { postId, context } = req.body;
    const postModeration = new PostModeration({
      post: { _id: postId },
      context: { content: context },
    });
    await postModeration.save();
    return res.status(200).json({ message: "Post reported" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};
const reportUser = async (req, res) => {
  try {
    const { userId, context } = req.body;
    const userModeration = new UserModeration({
      user: { _id: userId },
      context: { content: context },
    });
    await userModeration.save();
    return res.status(200).json({ message: "User reported" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

const getPostReported = async (req, res) => {
  try {
    const reportedPosts = await PostModeration.find();
    return res.status(200).json(reportedPosts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

const getUserReported = async (req, res) => {
  try {
    const reportedUsers = await UserModeration.find();
    return res.status(200).json(reportedUsers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

export default {
  deletePost,
  banUser,
  reportPost,
  reportUser,
  getPostReported,
  getUserReported,
  approuvePost,
};

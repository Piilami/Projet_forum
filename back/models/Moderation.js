import mongoose from "mongoose";

const PostModerationSchema = new mongoose.Schema({
  post: {
    _id: { type: String, required: true },
  },
  context: {
    content: { type: String, required: true },
  },
});

const UserModerationSchema = new mongoose.Schema({
  user: {
    _id: { type: String, required: true },
  },
  context: {
    content: { type: String, required: true },
  },
});

const PostModeration = mongoose.model("PostModeration", PostModerationSchema);
const UserModeration = mongoose.model("UserModeration", UserModerationSchema);

export { PostModeration, UserModeration };

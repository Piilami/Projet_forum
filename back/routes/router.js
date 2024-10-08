import express from "express";
import authRouter from "../routes/auth.routes.js";
import AUTHmiddleware from "../middleware/auth.jwt.js";
import userRouter from "../routes/user.routes.js";
import postsRouter from "../routes/posts.routes.js";
import moderationRouter from "../routes/moderation.routes.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", AUTHmiddleware, userRouter);
router.use("/posts", AUTHmiddleware, postsRouter);
router.use("/admin", isAdmin, AUTHmiddleware, moderationRouter);

export default router;

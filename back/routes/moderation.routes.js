import express from "express";
import moderationController from "../controllers/moderation.controller.js";
import authController from "../controllers/auth.controller.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

router.post("/createuser", authController.register);
router.delete("/deletepost/:id", moderationController.deletePost);
router.delete("/approuvepost/:id", moderationController.approuvePost);
router.put("/banuser/:id", moderationController.banUser);
router.post("/reportpost", moderationController.reportPost);
router.post("/reportuser", moderationController.reportUser);
router.get("/getpostreported", moderationController.getPostReported);
router.get("/getuserreported", moderationController.getUserReported);

export default router;

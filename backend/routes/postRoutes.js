import express from "express";
const router = express.Router();
import {
  addPost,
  addLike,
  addComment,
  fetchPosts,
} from "../controllers/postController.js";

import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addPost);

router.route("/fetchPosts").post(fetchPosts);


router.route("/addLike").post(protect, addLike)

router.route("/addComment").post(protect, addComment)


export default router;

import express from "express";
import LikedJobController from "../controllers/likedJob.controller.js";

const LikedJobsRouter = express.Router();

LikedJobsRouter.post("/", LikedJobController.createLikedJob);

LikedJobsRouter.get("/", LikedJobController.getLikedJobs);

LikedJobsRouter.get("/:id", LikedJobController.getLikedJobById);

LikedJobsRouter.get("/user/:UserId", LikedJobController.getLikedJobsByUserId);

LikedJobsRouter.put("/:id", LikedJobController.updateLikedJob);

LikedJobsRouter.delete("/", LikedJobController.deleteLikedJob);
LikedJobsRouter.delete("/:id", LikedJobController.deleteLikedJobById);

export default LikedJobsRouter;

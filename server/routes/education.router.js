import express from "express";
import EducationController from "../controllers/education.controller.js";

const EducationRouter = express.Router();

EducationRouter.post("/", EducationController.createEducation); //Kjo rrugë përdoret për të krijuar një të dhënë të re për arsimin

EducationRouter.get("/", EducationController.getEducations); // Kjo rrugë përdoret për të marrë të gjitha të dhënat e arsimit

EducationRouter.get("/:id", EducationController.getEducationById); //Kjo rrugë përdoret për të marrë një të dhënë të arsimit për një id të veçantë 

EducationRouter.put("/:id", EducationController.updateEducation); //Kjo rrugë përdoret për të përditësuar një të dhënë arsimi për një id të veçantë 

EducationRouter.delete("/:id", EducationController.deleteEducation);

EducationRouter.get("/user/:id", EducationController.getEducationsByUserId);

export default EducationRouter;

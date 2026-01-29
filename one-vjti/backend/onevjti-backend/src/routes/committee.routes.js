// import { Router } from "express";
// import { createCommittee } from "../controllers/committee.controller.js";
// import {verifyJWT} from "../middlewares/auth.middleware.js"
// import {upload} from "../middlewares/multer.middleware.js"

// const router = Router()
// router.use(verifyJWT) // aply login to all who plays with committee
// router.post(
//     "/",
//     upload.single("logo"),
//     createCommittee
// );


// export default router
import { Router } from "express";
import {
  createCommittee,
  getAllCommittees,
  updateCommittee,
  toggleFollow,        // 🔥 Add this
  getMyNotifications   // 🔥 Add this
} from "../controllers/committee.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// GET all committees (PUBLIC – no JWT)
router.get("/", getAllCommittees);

// SECURE ROUTES (User must be logged in)
router.post("/toggle-follow/:committeeId", verifyJWT, toggleFollow);
router.get("/notifications", verifyJWT, getMyNotifications);

// CREATE committee (ADMIN only)
router.post(
  "/",
  verifyJWT,
  upload.single("logo"),
  createCommittee
);
router.patch("/update", verifyJWT, upload.single("logo"), updateCommittee);
export default router;

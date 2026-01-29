// import { Router } from "express";
// import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from "../controllers/event.controller.js";
// import {verifyJWT} from "../middlewares/auth.middleware.js"
// import { upload } from "../middlewares/multer.middleware.js";
// const router = Router()


// // router.route("/").post(verifyJWT,createEvent)
// // import multer from "multer";

// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "./public/temp")
// //   },
// //   filename: function (req, file, cb) {
    
// //     cb(null, file.originalname)
// //   }
// // })

// // export const upload = multer({ 
// //     storage, 
// // })
// router.post(
//     "/",
//     verifyJWT,
//     upload.fields([{name: "poster", maxCount: 1}]),
//     createEvent
// );
// router.route("/").get(getAllEvents)
// router.route("/:eventId").get(getEventById)
// router.route("/:eventId").patch(updateEvent)
// router.route("/:eventId").delete(deleteEvent)

// export default router

import { Router } from "express";
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from "../controllers/event.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
    "/",
    verifyJWT,
    upload.single("poster"), // CHANGED: using .single() to match req.file in controller
    createEvent
);

router.route("/").get(getAllEvents);
router.route("/:eventId").get(getEventById);
router.route("/:eventId").patch(updateEvent);
router.route("/:eventId").delete(deleteEvent);

export default router;
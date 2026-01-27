import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    // Adds a unique suffix to prevent file name collisions
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Preserves the original file extension (e.g., .jpg, .png)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    // cb(null, file.originalname)
  }
})

export const upload = multer({ 
    storage, 
})
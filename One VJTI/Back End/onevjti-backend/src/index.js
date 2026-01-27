// import dotenv from "dotenv"

// import connectDB from "./db/index.js";
// import { app } from "./app.js";

// dotenv.config()
// const PORT=8000
// connectDB()
// .then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server is running at port: ${PORT}`);
        
//     })
// })
// .catch((err) => {
//     console.log("Mongo DB connection FAILED!", err);
    
// })

import dotenv from "dotenv";
dotenv.config(); // 🔥 MUST be first

import connectDB from "./db/index.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo DB connection FAILED!", err);
  });
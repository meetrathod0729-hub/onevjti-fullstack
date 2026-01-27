import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(cors({
    origin: ["http://localhost:5173",
        "http://localhost:5174","http://localhost:5175"],
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from './routes/user.routes.js'
import eventRouter from './routes/event.routes.js'
import committeeRouter from './routes/committee.routes.js'
import memberRouter from './routes/member.routes.js'
import eventRegistrationRoutes from "./routes/eventRegistration.routes.js";
//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/events", eventRouter)
app.use("/api/v1/committees", committeeRouter)
app.use("/api/v1/members", memberRouter)
app.use("/api/v1/event-registrations", eventRegistrationRoutes);
export { app }
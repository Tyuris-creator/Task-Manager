import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js"
import cors from "cors"
import path from "path"
dotenv.config()

const app = express()
const __dirname = path.resolve()
// middleware

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  )
}

app.use(express.json()) // this middleware will parse JSON bodies: req.body



app.get("/server", (req, res) => {
  res.status(200).send("мой сервер!")
})

app.use(rateLimiter)

app.use((req, res, next) => {
  console.log("We just got a new request!", req.method, req.url)
  next()
})

app.use("/api/notes", notesRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  })
}


connectDB().then(() => {
  app.listen(process.env.PORT || 5001, () => {
    console.log(`server started on port ${process.env.PORT || 5001}`)
  })
})

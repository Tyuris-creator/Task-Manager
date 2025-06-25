import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js"
import cors from "cors"
dotenv.config()

const app = express()

// middleware
app.use(cors())

app.use(express.json()) // this middleware will parse JSON bodies: req.body

app.get("/", (req,res)=>{
  res.status(200).json({"intro":"this is an API made by Michail Tiurin!"})
})

app.get("/server", (req,res)=>{
  res.status(200).send("мой сервер!")
})

app.use(rateLimiter)

app.use((req, res, next) => {
  console.log("We just got a new request!", req.method, req.url)
  next()
})



app.use("/api/notes", notesRoutes)

connectDB().then(() => {
  app.listen(process.env.PORT || 5001, () => {
    console.log(`server started on port ${process.env.PORT || 5001}`)
  })
})

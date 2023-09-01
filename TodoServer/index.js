import mongoose from 'mongoose';
import express, { Router } from "express"
import todoRouter from './routes/todo.routes.js';
import cors from "cors"
const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const apiRouter = Router()
apiRouter.use("/todo", todoRouter)
app.use("/api", apiRouter)

// port 
const PORT = process.env.PORT ?? 8000

async function main() {
  await mongoose.connect("mongodb+srv://modianuj7613:admin@cluster0.6xowtxk.mongodb.net/todo?retryWrites=true&w=majority");

  app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
  })
}

main()
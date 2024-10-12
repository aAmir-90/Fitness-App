import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"

import userRoutes from "./routes/userRoutes.js";

dotenv.config()


connectDB()

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1/user", userRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
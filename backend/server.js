import dotenv from "dotenv"
import express from "express"
import connectDB from "./config/db.js"
import cors from "cors"
import balanceRoutes from "./routes/balanceRoutes.js"
import conversionRoutes from "./routes/conversionRoutes.js"
import rewardRoutes from "./routes/rewardRoutes.js"
dotenv.config()
const app = express()
connectDB()
app.use(cors())
app.use(express.json())
app.use("/api/balance", balanceRoutes)
app.use("/api/conversion", conversionRoutes)
app.use("/api/rewards", rewardRoutes)
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
    
})
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js";

dotenv.config()
const app = express()
app.use(express.json())

// Create connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connection to db successful!!!"))
.catch(() => console.log("Oooops something went wrong!!!"))
app.use(userRoutes)

app.listen(4000, () =>{
    console.log("app is listening on port 4000");
})
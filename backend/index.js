import express from 'express'
import cors from 'cors'
import dotenv, { config } from 'dotenv'
import colors from 'colors'
import { postRouter } from './apis/postAPIS.js'
import { connectDB } from './config/connect.js'
import dns from "dns";
import { userRouter } from './apis/userApis.js'
import { errorhandler } from './midlleweres/errorMidllewere.js'
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
connectDB()



app.use('/api/post/', postRouter)
app.use('/api/user/', userRouter)



app.use(errorhandler)

app.listen(process.env.PORT, () => {
    console.log(`server run on port:${process.env.PORT.cyan}`)
})
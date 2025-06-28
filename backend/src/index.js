import express from 'express'
import dotenv from 'dotenv/config'
import authRoute from '../routes/auth.route.js'
import postRoute from '../routes/post.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDb } from '../lib/db.js'
import path from 'path'

const app = express()
const SERVER_PORT = process.env.PORT

app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ extended: true, limit: '100mb' }))
app.use(cookieParser())
app.use(cors({
    origin:'http://192.168.1.4:5173',
    credentials:true
}))

app.use('/api/auth',authRoute)
app.use('/api/post',postRoute)

if(process.env.NODE_MODE !== 'development'){
    app.use(express.static(path.join(__dirname,"..frontend/dist")))

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,"..frontend","dist","index.html"))
    })
    

}

app.listen(SERVER_PORT,()=>{
    console.log(`Server is running at the PORT: ${SERVER_PORT}`)
    connectDb()
})
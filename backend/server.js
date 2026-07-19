import 'dotenv/config'
import dotenv from 'dotenv'
dotenv.config()
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import  express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js' 
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';

// app config
const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended : true}))
app.use(cors())

// api endpoints
app.use('/api/admin',adminRouter)
//  localhost:4000 /api/admin/add-doctor

app.get('/',(req,res)=>{
     res.send('API WORKING ')
})

app.listen(port, ()=> console.log(`Server started , port ${port}`))
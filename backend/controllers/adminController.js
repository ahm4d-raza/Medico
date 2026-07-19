import validator from "validator"
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from "jsonwebToken"


const addDoctor = async (req, res) => {

     try {
          const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
          const imageFile = req.file // Captured by multer middleware


          console.log("req.file=", req.file)
          console.log("image path =", imageFile?.path)

          // 1. CRITICAL FIX: Add !imageFile to the validation check
          if (!name) return res.json({ success: false, message: "name missing" });
          if (!email) return res.json({ success: false, message: "email missing" });
          if (!password) return res.json({ success: false, message: "password missing" });
          if (!speciality) return res.json({ success: false, message: "speciality missing" });
          if (!imageFile) return res.json({ success: false, message: "image missing" });

          // validating email format
          if (!validator.isEmail(email)) {
               return res.json({ success: false, message: "Please enter a valid email" })
          }

          // validating strong password
          if (password.length < 8) {
               return res.json({ success: false, message: "Please enter a strong password" })
          }

          // hashing doctor password
          const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(password, salt)

          // 2. Wrap Cloudinary upload in a try-catch block to pinpoint credentials issues
          let imageUrl = ""
          try {
               const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
               imageUrl = imageUpload.secure_url
          } catch (cloudinaryError) {
               console.error("Cloudinary Configuration Error Details:", cloudinaryError)
               return res.json({ success: false, message: "Cloudinary upload failed. Check server logs for credential errors." })
          }

          // 3. Prevent address JSON parsing failure from breaking the request
          let parsedAddress;
          try {
               parsedAddress = typeof address === 'string' ? JSON.parse(address) : address
          } catch (e) {
               return res.json({ success: false, message: "Invalid address JSON format. Use double quotes." })
          }

          const doctorData = {
               name,
               email,
               image: imageUrl,
               password: hashedPassword,
               speciality,
               degree,
               experience,
               about,
               fees: Number(fees),
               address: parsedAddress,
               date: Date.now()
          }

          const newDoctor = new doctorModel(doctorData)
          await newDoctor.save()

          return res.json({ success: true, message: "Doctor Added" })

     } catch (error) {
          console.log("Global Controller Error:", error)
          return res.json({ success: false, message: error.message })
     }
}

// API for admin login
const loginAdmin = async (req,res) => {
     try {

          const {email,password} = req.body

          if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
               const token =jwt.sign(email+password,process.env.JWT_SECRET)
               res.json({success:true,token})
          } else{
               res.json({success:false,message:"Invalid credentials"})
          }
          
     } catch (error) {
          console.log("Global Controller Error:", error)
          return res.json({ success: false, message: error.message })
     }
}

export { addDoctor , loginAdmin }
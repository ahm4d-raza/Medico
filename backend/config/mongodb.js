import mongoose from 'mongoose'
 
const connectDB = async () =>{
try{
     console.log("your uri is :" , process.env.MONGODB_URI);
mongoose.connection.on('connected', ()=> console.log("Database Connected"))

     await mongoose.connect(`${process.env.MONGODB_URI}/medico`)
}catch(error){
     console.error("mpngodb connection fails", error.message)
     process.exit(1)
}
}
export default connectDB
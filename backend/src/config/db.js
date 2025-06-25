import mongoose from "mongoose"


export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('DB connected...')
  } catch (error) {
    console.error('Dammit...', error)
    process.exit(1) 
  }
}
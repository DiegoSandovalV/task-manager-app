import mongoose from "mongoose"

const connectMongoDB = async () => {
  try {
    mongoose.set("strictQuery", false)
    mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB connected")
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error)
  }
}

export default connectMongoDB

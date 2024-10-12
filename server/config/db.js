import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected successfully ${mongoose.connection.host}`)
    } catch (error) {
        console.log("Error in connected MongoDB", error)
    }
}

export default connectDB
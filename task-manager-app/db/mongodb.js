import moongose from 'mongoose';

const connectMongoDB = () =>{

  try {
    moongose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.log('Error connecting to MongoDB: ', error);
  }
}

export default connectMongoDB;
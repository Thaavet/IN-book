import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import bookRoutes from './routes/book.js';


dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: ["https://insuperbooks.netlify.app"],
    credentials: true,
  })
);

mongoose.connect(process.env.MONGODB_URL
).then(() => console.log('DB connected'))
;



app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/books', bookRoutes);
  




const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

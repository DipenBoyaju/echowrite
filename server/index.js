import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js'
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const Mongo_db = process.env.DATABASE_URL;

mongoose.connect(Mongo_db)
  .then(() => {
    console.log('Database is Connected');
  })
  .catch(err => {
    console.error(err);
  });

app.listen(PORT, () => {
  console.log(`Server live at port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Server</h1>');
});

//routes
app.use('/api/auth', authRoutes);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})

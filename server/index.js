import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const Mongo_db = process.env.DATABASE_URL;

mongoose.connect(Mongo_db)
  .then(() => {
    console.log('Database is Connected');
  })
  .catch(err => {
    console.error(err)
  })


app.listen(PORT, () => {
  console.log(`server live at port ${PORT}`);
})

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Server</h1>');
});





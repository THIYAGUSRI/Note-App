import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import useRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import noteRoute from './routes/note.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';


dotenv.config();

mongoose.connect(process.env.MONGO).then( () => {
    console.log('mongoDB is connected');
  }).catch( err => { 
    console.log(err);
  }); 

  const __dirname = path.resolve();

const app = express();


app.use(express.json());
app.use(cookieParser()); 

app.listen(3001, () => {
    console.log("Server is running on port 3001");  
});

app.use('/api/user', useRoute);
app.use('/api/auth', authRoute);
app.use('/api/note', noteRoute);

app.use(express.static(path.join(__dirname, '/FrontEnd/dist')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'FrontEnd', 'dist', 'index.html'));
});


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
 });
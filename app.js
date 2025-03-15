import express, { json } from 'express'
import cookieParse from 'cookie-parser';
import connectDB from './DB.js';
import morgan from 'morgan';
import userRouter from './routes/user.routes.js';
import { corsMiddleware } from './middleware/middlewareCors.js';

const PORT = 4040;

connectDB()
const app = express();
app.use(corsMiddleware());
app.use(cookieParse());
app.use(json());
app.use(morgan('dev'));

app.use('/',userRouter)


app.listen(PORT,()=>{
    console.log("http://localhost:"+PORT);
})


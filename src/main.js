import { config } from 'dotenv';
import './lib/db/mongoose.js';
import express from 'express';
import bookRouter from './collection/book/book.route.js'
import authorRouter from './collection/author/author.route.js';
import logsRouter from './collection/logs/logs.route.js';
import otpRouter from "./collection/author/otp.route.js";
// import { book } from './collection/book/model/book.model.js';
config();
const app = express();

app.use(express.json());

app.use('/author',authorRouter);
app.use("/author", otpRouter);
app.use('/book' , bookRouter);
app.use('/logs',logsRouter);

app.listen(4000,console.log('server on port 4000'));


// book.create({
//     title:"Futur",
//     author :"Fatma",
//     year:"2002"
// });

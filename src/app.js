import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from "./routes/mocks.router.js";
//import loggerRouter from "./routes/logger.router.js";
//import errorHandler from './middleware/error.js';
//import { addLogger } from './middleware/middleLogger.js';


const app = express();
const PORT = process.env.PORT||8080;

const connection = mongoose.connect(`mongodb+srv://LeandroA20:Sonic12345@cluster0.lxqoi.mongodb.net/Adoptme?retryWrites=true&w=majority&appName=Cluster0`);

// Middleware

app.use(express.json());
app.use(cookieParser());

// logger middleware
//app.use(addLogger);

// Routes
app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use("/api/mocks", mocksRouter);
//app.use('/api/logger', loggerRouter )
// Manejador de errores.
//app.use(errorHandler);

app.listen(PORT,()=>console.log(`Listening on ${PORT}, http://localhost:${PORT} `));

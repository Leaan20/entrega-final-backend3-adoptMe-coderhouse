import express from 'express';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from "./routes/mocks.router.js";
import connectDB from "./db.js";
//import loggerRouter from "./routes/logger.router.js";
//import errorHandler from './middleware/error.js';
//import { addLogger } from './middleware/middleLogger.js';


const app = express();
const PORT = process.env.PORT||8080;
connectDB();

// TODO : Proyecto de entrega final


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

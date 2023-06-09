import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import logger from "./utils/log";

const createError = require('http-errors');
// import JokeController from "./controllers/JokeController";

const routes = require('./routes/index');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.use( async (req: Request, res: Response, next: NextFunction) => {
    next(createError.NotFound('Route not Found'))
})
app.use( (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    
    res.status(err.status || 500).json({
        status: false,
        message: err.message
    })
})

app.listen(3001);
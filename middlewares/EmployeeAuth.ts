const jwt = require('../utils/jwt');
import { Request, Response, NextFunction } from "express";
import { Employee } from "../types/employee"

module.exports = (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.headers.authorization?.split(" ")[1];
        jwt.verifyAccessToken(token)
        .then((payload: Employee) => {
            next();
        })
        .catch((error:any) => {
            return res.status(401).json({
                message: "Authentication Failed"
            });
        });
    } catch (error: any) {
        return res.status(401).json({
            message: "Authentication Failed"
        });
    }
}
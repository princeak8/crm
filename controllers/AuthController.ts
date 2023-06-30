import { Request, Response, NextFunction } from "express";
import logger from "../utils/log";
import AuthService from "../services/authService";

import LoginValidation from "../validations/Login";
import { EmployeeResource } from "../resources";

const authService = new AuthService;

class AuthController {
    async login(req: Request, res: Response, next: NextFunction)  {
        try{
            const { error } = LoginValidation(req.body);
            
            if(!error) {
                let loggedInEmployee = await authService.login(req.body)
                return (loggedInEmployee.success) ? res.json({ loggedInEmployee }) : res.status(400).json({Errors: loggedInEmployee.message});
            }else{
                res.status(400)
                .json({Errors: error.details});
            }
        }catch(error:any) { // intercept the error in catch block
            logger.error(error.message);
            next(error);
        }
    }
}

export default new AuthController


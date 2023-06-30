import { Request, Response, NextFunction } from "express";
import logger from "../utils/log";
import EmployeeService from "../services/employeeService";

import SaveEmployeeValidation from "../validations/SaveEmployee";
import { EmployeeResource } from "../resources";

const employeeService = new EmployeeService;

class EmployeeController {
    async save(req: Request, res: Response, next: NextFunction)  {
        try{
            const { error } = SaveEmployeeValidation(req.body);
            delete req.body.confirm_password;
            
            if(!error) {
                let exists = await employeeService.EmailOrPhoneNumberExists(req.body.phone_number, req.body?.email);
                if(!exists) {
                    let employee = await employeeService.save(req.body)
                    employee = new EmployeeResource(employee).data;
                    // console.log(employee.data);
                    res.json({ employee });
                }else{
                    res.status(400)
                    .json({Errors: "Phone Number or Email already exists"});
                }
            }else{
                res.status(400)
                .json({Errors: error.details});
            }
        }catch(error:any) { // intercept the error in catch block
            logger.error(error.message);
            next(error);
        }
    }

    async all(req: Request, res: Response, next: NextFunction)  {
        try{
            let employees = await employeeService.getAll();
            employees = EmployeeResource.collection(employees);
            res.json({employees});
        }catch(error:any) { // intercept the error in catch block
            logger.error(error.message);
            next(error);
        }
    }

    async get(req: Request, res: Response, next: NextFunction)  {
        try{
            let id  = parseInt(req.params.id);
            if(!Number.isNaN(id)) {
                let employee = await employeeService.getById(id);
                employee = (employee) ? new EmployeeResource(employee) : {};
                res.json({employee});
            }else{
                res.status(400)
                .json({Errors: "invalid ID, ID must be an integer"});
            }
        }catch(error:any) { // intercept the error in catch block
            logger.error(error.message);
            next(error);
        }
    }
}

export default new EmployeeController


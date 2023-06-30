import { Request, Response, NextFunction } from "express";
import logger from "../utils/log";
const jwt =  require("../utils/jwt");
import CustomerService from "../services/customerService";

import CustomerResource from "../resources/CustomerResource";
import { CustomerUpdatePayload } from "../types/requests/customer";
import SaveCustomerValidation from "../validations/SaveCustomer";
import UpdateCustomerValidation from "../validations/UpdateCustomer";

const customerService = new CustomerService();

class CustomerController {
  async save(req: Request, res: Response, next: NextFunction) {
    try{
        const { error } = SaveCustomerValidation(req.body);

        if(!error) {
            let exists = await customerService.EmailOrPhoneNumberExists(req.body.phone_number, req.body?.email);
            if (exists) return res.status(400).json({ Errors: "Phone Number or Email already exists" });
            const { payload: {payload: user, exp} } = await jwt.user(req);

            let customer = await customerService.save(req.body, user.id);
            customer = CustomerResource.single(customer);
            res.json({ customer });
        }else{
            res.status(400)
            .json({Errors: error.details});
        }
    }catch(error:any) { // intercept the error in catch block
        logger.error(error.message);
        next(error);
    }
  }

  async all(req: Request, res: Response, next: NextFunction) {
    try{
        let customers = await customerService.getAll();
        customers = CustomerResource.collection(customers);
        res.json({ customers });
    }catch(error:any) { // intercept the error in catch block
        logger.error(error.message);
        next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try{
        let id = parseInt(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ Errors: "invalid ID, ID must be an integer" });

        let customer = await customerService.getById(id);
        customer = customer ? CustomerResource.single(customer) : {};
        res.json(customer ? { customer } : {});
    }catch(error:any) { // intercept the error in catch block
        logger.error(error.message);
        next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try{
        const { error } = UpdateCustomerValidation(req.body);
        if(!error) {
            const exist = await customerService.getById(+req.body.id);
            let customer = await customerService.update(req.body);
            customer = CustomerResource.single(customer);
            res.json({ customer });
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

export default new CustomerController();

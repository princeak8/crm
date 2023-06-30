import { Request, Response, NextFunction } from "express";
import logger from "../utils/log";
const jwt =  require("../utils/jwt");
import ProspectService from "../services/prospectService";

import SaveProspectValidation from "../validations/SaveProspect";
import { ProspectResource } from "../resources";

const prospectService = new ProspectService;

class ProspectController {
    async save(req: Request, res: Response, next: NextFunction)  {
        try{
            const { error } = SaveProspectValidation(req.body);
            
            if(!error) {
                let exists = await prospectService.EmailOrPhoneNumberExists(req.body.phone_number, req.body?.email);
                if(!exists) {
                    // console.log('success');
                    const { payload: {payload: user, exp} } = await jwt.user(req);
                    // console.log(user);
                    // console.log("expiry:", exp);
                    let prospect = await prospectService.save(req.body, user.id)
                    prospect = new ProspectResource(prospect).data;
                    res.json({ prospect });
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
            // return error response
            // res.status(500)
            // .json({ message: "An error occured: "+error.message })
            next(error);
        }
    }

    async all(req: Request, res: Response, next: NextFunction)  {
        try{
            let prospects = await prospectService.getAll();
            prospects = ProspectResource.collection(prospects);
            res.json({prospects});
        }catch(error:any) { // intercept the error in catch block
            logger.error(error.message);
            next(error);
        }
    }

    async get(req: Request, res: Response, next: NextFunction)  {
        try{
            let id  = parseInt(req.params.id);
            console.log(id);
            if(!Number.isNaN(id)) {
                let prospect = await prospectService.getById(id);
                prospect = (prospect) ? ProspectResource.single(prospect) : {};
                res.json({prospect});
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

export default new ProspectController


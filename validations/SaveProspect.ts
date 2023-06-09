import Joi from "joi";
import joiValidator from "./Joi-Validator";

const prospectSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    phone_number: Joi.string().required(),
    address: Joi.string(),
})

export default joiValidator(prospectSchema);
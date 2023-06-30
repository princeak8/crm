import Joi from "joi";
import joiValidator from "./Joi-Validator";

const customerSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    email: Joi.string().email(),
    phone_number: Joi.string().required(),
    address: Joi.string(),
})

export default joiValidator(customerSchema);
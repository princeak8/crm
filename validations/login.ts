import Joi from "joi";
import joiValidator from "./Joi-Validator";

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()

})

export default joiValidator(loginSchema);
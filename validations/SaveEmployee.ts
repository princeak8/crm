import Joi from "joi";
import joiValidator from "./Joi-Validator";
import { joiPasswordExtendCore } from "joi-password";
const joiPassword = Joi.extend(joiPasswordExtendCore);

const employeeSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: joiPassword.string().min(5)
                .minOfSpecialCharacters(1).minOfLowercase(1).minOfUppercase(1)
                .minOfNumeric(1).noWhiteSpaces().onlyLatinCharacters().required(),
    confirm_password: Joi.any().valid(Joi.ref('password')).required()
                    .messages({
                        "any.only": "confirm_password mst match password"
                    }),
    phone_number: Joi.string().required(),
    department_id: Joi.number().required()

})

export default joiValidator(employeeSchema);
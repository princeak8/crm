import Joi from "joi";

export default function validator(schema: Joi.ObjectSchema<any>)
{
    return (payload: any) => schema.validate(payload, { abortEarly: false });
}
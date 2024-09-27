import{ Response, Request, NextFunction } from "express";
import Joi from "joi";

const reposchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    url: Joi.string().required(),
    isPrivate: Joi.number().min(1).max(2).required()
})

 export const validateRepo = (req: Request, res: Response, next: NextFunction) => {
    const { error } = reposchema.validate(req.body)
    if (error == null) {
        next()
    }else {
        res.status(422).json(error);
    }
 }

// const patchRepoSchema = Joi.object({
//     name: Joi.string().optional(), 
//     isPrivate: Joi.number().min(1).max(2).optional() 
// }).or('name', 'isPrivate'); 

// export const validatePatchRepo = (req: Request, res: Response, next: NextFunction) => {
//     const { error } = patchRepoSchema.validate(req.body);

//     if (!error) {
//         next(); 
//     } else {
//         res.status(422).json(error); 
//     }
// };

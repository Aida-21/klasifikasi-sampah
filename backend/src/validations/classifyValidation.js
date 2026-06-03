import Joi from "joi";

export const classifyValidation = Joi.object({
  prediction: Joi.string().required(),
  confidence: Joi.number().min(0).max(100).required(),
});
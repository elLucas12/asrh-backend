import Joi from 'joi';

export const EscalaRegistrarDtoSchema = Joi.object({
  nome: Joi.string().required(),
  horasDiarias: Joi.number().integer().required(),
  diasSemana: Joi.number().integer().required()
}).options({
    abortEarly: false
});

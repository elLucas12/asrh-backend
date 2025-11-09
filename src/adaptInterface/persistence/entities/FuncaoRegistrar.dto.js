import Joi from 'joi';

export const FuncaoCadastrarDtoSchema = Joi.object({
  nome: Joi.string().required(),
  salario: Joi.number().required(),
  setor: Joi.number().integer().required(),
  escala: Joi.number().integer().required()
}).options({
    abortEarly: false
});

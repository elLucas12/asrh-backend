import Joi from 'joi';

export const FuncionarioCadastrarDtoSchema = Joi.object({
  nome: Joi.string().required(),
  cpf: Joi.string().length(11).required(),
  rg: Joi.string().length(9).required(),
  ctps: Joi.string().max(15).required(),
  telefone: Joi.string(),
  email: Joi.string(),
  endereco: Joi.string().required(),
  funcao: Joi.number().integer().required(),
  dataAdmissao: Joi.date().required(),
  dataDemissao: Joi.date().allow(null).required(),
  flag: Joi.number().integer().required()
}).options({
    abortEarly: false
});

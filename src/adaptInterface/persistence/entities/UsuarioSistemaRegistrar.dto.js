import Joi from 'joi';

export const UsuarioSistemaRegistrarDtoSchema = Joi.object({
  nome: Joi.string().required(),
  senha: Joi.string().required()
}).options({
    abortEarly: false
});

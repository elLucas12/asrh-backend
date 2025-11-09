import Joi from 'joi';

export const SetorRegistrarDtoSchema = Joi.object({
  nome: Joi.string().required(),
  descricao: Joi.string().required(),
  descricaoAtividades: Joi.string().required()
}).options({
    abortEarly: false
});

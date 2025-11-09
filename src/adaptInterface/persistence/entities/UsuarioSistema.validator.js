import { BadRequestException } from '@nestjs/common';

export class UsuarioSistemaValidatorPipe {
  constructor(schema) {
    this.schema = schema;
  }
  transform(value, metadata) {
    const {error} = this.schema.validate(value);
    if (error) {
      const mensagens = error.details.map(d => d.message).join();
      throw new BadRequestException(mensagens);
    }
    return value;
  }
}

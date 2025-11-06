import { Injectable, Dependencies, NotFoundException } from '@nestjs/common';
import { FuncionarioORMRepository } from '../../adaptInterface/persistence/repositories/FuncionarioORM.repository';

@Injectable()
@Dependencies(
  FuncionarioORMRepository
)
export class ServicoCadastramento {
  #funcionarioRepository;

  constructor(funcionarioRepository) {
    this.#funcionarioRepository = funcionarioRepository;
  }

  async cadastrarFuncionario(dadosFuncionario) {
    return this.#funcionarioRepository.cadastrarFuncionario(dadosFuncionario);
  }
}

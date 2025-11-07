import { Injectable, Dependencies, NotFoundException } from '@nestjs/common';
import { FuncionarioORMRepository } from '../../adaptInterface/persistence/repositories/FuncionarioORM.repository';
import { EscalaORMRepository } from '../../adaptInterface/persistence/repositories/EscalaORM.repository';

@Injectable()
@Dependencies(
  EscalaORMRepository,
  FuncionarioORMRepository
)
export class ServicoCadastramento {
  /** Repositório ORM de instâncias da entidade Funcionários */
  #funcionarioRepository;

  /** Repositório ORM de instâncias da entidade Escala */
  #escalaRepository;

  constructor(funcionarioRepository, escalaRepository) {
    this.#funcionarioRepository = funcionarioRepository;
    this.#escalaRepository = escalaRepository;
  }

  /**
   * Utiliza o repositório de Funcionários para registrar uma instância deste.
   * 
   * @param {*} dadosFuncionario Objeto com dados da instância a ser registrada.
   * @returns Objeto construido da entidade ou 'undefined'.
   */
  async cadastrarFuncionario(dadosFuncionario) {
    return this.#funcionarioRepository.cadastrarFuncionario(dadosFuncionario);
  }

  /**
   * Utiliza o repositório de Escala para registrar uma instância deste.
   * 
   * @param {*} dadosFuncionario Objeto com dados da instância a ser registrada.
   * @returns Objeto construido da entidade ou 'undefined'.
   */
  async registrarEscala(dadosEscala) {
    return this.#escalaRepository.registrarEscala(dadosEscala);
  }
}

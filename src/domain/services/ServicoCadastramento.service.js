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
    return await this.#funcionarioRepository.cadastrarFuncionario(dadosFuncionario);
  }

  /**
   * Retorna todas as instâncias da entidade Funcionario existentes no sistema.
   */
  async consultarTodosFuncionarios() {
    return await this.#funcionarioRepository.todos();
  }

  /**
   * Consulta uma instância da entidade Funcionario através de seu número de ID.
   * 
   * @param {number} id Número de ID da instância a ser consultada.
   * @returns Objeto construido da instância consultada.
   */
  async consultarFuncionario(id) {
    return await this.#funcionarioRepository.consulta(id);
  }

  /**
   * Consulta funcionários no sistema por nome.
   * 
   * @param {string} nome String com nome, parcial ou total, para consulta. 
   */
  async consultarFuncionariosPorNome(nome) {
    return await this.#funcionarioRepository.consultarPorNome(nome);
  }

  /**
   * Atualiza uma instância de funcionário no sistema.
   * 
   * @param {number} id Número de ID do funcionário.
   * @param {*} dadosFuncionario Objeto com dados atualizados.
   * @returns Objeto construido da instância do funcionário atualizado.
   */
  async atualizarFuncionario(id, dadosFuncionario) {
    return await this.#funcionarioRepository.atualizar(id, dadosFuncionario);
  }

  /**
   * Utiliza o repositório de Escala para registrar uma instância deste.
   * 
   * @param {*} dadosFuncionario Objeto com dados da instância a ser registrada.
   * @returns Objeto construido da entidade ou 'undefined'.
   */
  async registrarEscala(dadosEscala) {
    return await this.#escalaRepository.registrarEscala(dadosEscala);
  }

  async consultarTodosEscalas() {
    return await this.#escalaRepository.todos();
  }

  async consultarEscala(id) {
    return await this.#escalaRepository.consultar(id);
  }

  async consultarEscalaPorNome(nome) {
    return await this.#escalaRepository.consultarPorNome(nome);
  }

  async atualizarEscala(id, dadosEscala) {
    return await this.#escalaRepository.atualizar(id, dadosEscala);
  }
}

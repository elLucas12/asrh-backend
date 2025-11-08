import { Injectable, Dependencies, NotFoundException } from '@nestjs/common';

import { FuncionarioORMRepository } from '../../adaptInterface/persistence/repositories/FuncionarioORM.repository';
import { EscalaORMRepository } from '../../adaptInterface/persistence/repositories/EscalaORM.repository';
import { FuncaoORMRepository } from '../../adaptInterface/persistence/repositories/FuncaoORM.repository';
import { SetorORMRepository } from '../../adaptInterface/persistence/repositories/SetorORM.repository';

@Injectable()
@Dependencies(
  FuncionarioORMRepository,
  FuncaoORMRepository,
  SetorORMRepository,
  EscalaORMRepository,
)
export class ServicoCadastramento {
  /** Repositório ORM de instâncias da entidade Funcionários */
  #funcionarioRepository;

  /** Repositório ORM de instâncias da entidade Funcao */
  #funcaoRepository;

  /** Repositório ORM de instâncias da entidade Setor */
  #setorRepository;

  /** Repositório ORM de instâncias da entidade Escala */
  #escalaRepository;

  constructor(
    funcionarioRepository, 
    funcaoRepository, 
    setorRepository, 
    escalaRepository
  ) {
    this.#funcionarioRepository = funcionarioRepository;
    this.#funcaoRepository = funcaoRepository;
    this.#setorRepository = setorRepository;
    this.#escalaRepository = escalaRepository;
  }

  //////////////////////////////////////////////////
  // MÉTODOS DE SERVIÇO DA ENTIDADE 'FUNCIONARIO' //
  //////////////////////////////////////////////////

  /**
   * Arquiva uma instância de Funcionario no sistema através de seu ID.
   * 
   * @param {number} id Número de ID do funcionário.
   * @returns Objeto construido do funcionário.
   */
  async arquivarFuncionario(id) {
    let funcionario = await this.#funcionarioRepository.consultar(id);
    if (funcionario !== undefined) {
      funcionario.flag = 1;
      return await this.#funcionarioRepository.atualizarFuncionario(id, funcionario);
    }
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
    return await this.#funcionarioRepository.consultar(id);
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
   * Deleta uma instância de funcionário no sistema através de seu ID.
   * 
   * @param {number} id Número de ID do funcionário.
   * @returns Objeto construido da instância de funcionário em questão.
   */
  async deletarFuncionario(id) {
    return await this.#funcionarioRepository.deletar(id);
  }

  ////////////////////////////////////////////
  // MÉTODOS DE SERVIÇO DA ENTIDADE 'FUNCAO' //
  ////////////////////////////////////////////

  /**
   * Utiliza o repositório de Funcao para registrar uma instância deste.
   * 
   * @param {*} dadosFuncao Objeto com dados da instância a ser registrada.
   * @returns Objeto construido da entidade ou 'undefined'.
   */
  async registrarFuncao(dadosFuncao) {
    return await this.#funcaoRepository.registrar(dadosFuncao);
  }

  /**
   * Retorna todas as instâncias da entidade Funcao existentes no sistema.
   */
  async consultarTodosFuncaos() {
    return await this.#funcaoRepository.todos();
  }

  /**
   * Consulta uma instância da entidade Funcao através de seu número de ID.
   * 
   * @param {number} id Número de ID da instância a ser consultada.
   * @returns Objeto construido da instância consultada.
   */
  async consultarFuncao(id) {
    return await this.#funcaoRepository.consultar(id);
  }

  /**
   * Consulta funções no sistema por nome.
   * 
   * @param {string} nome String com nome, parcial ou total, para consulta. 
   */
  async consultarFuncoesPorNome(nome) {
    return await this.#funcaoRepository.consultarPorNome(nome);
  }

  /**
   * Atualiza uma instância de função no sistema.
   * 
   * @param {number} id Número de ID da função.
   * @param {*} dadosFuncionario Objeto com dados atualizados.
   * @returns Objeto construido da instância da função atualizado.
   */
  async atualizarFuncao(id, dadosFuncao) {
    return await this.#funcaoRepository.atualizar(id, dadosFuncao);
  }

  /**
   * Deleta uma instância de função no sistema através de seu ID.
   * 
   * @param {number} id Número de ID da função.
   * @returns Objeto construido da instância de função em questão.
   */
  async deletarFuncao(id) {
    return await this.#funcaoRepository.deletar(id);
  }

  ////////////////////////////////////////////
  // MÉTODOS DE SERVIÇO DA ENTIDADE 'SETOR' //
  ////////////////////////////////////////////

  /**
   * Utiliza o repositório de Setor para registrar uma instância deste.
   * 
   * @param {*} dadosSetor Objeto com dados da instância a ser registrada.
   * @returns Objeto construido da entidade ou 'undefined'.
   */
  async registrarSetor(dadosSetor) {
    return await this.#setorRepository.registrar(dadosSetor);
  }

  /**
   * Retorna todas as instâncias da entidade Setor existentes no sistema.
   */
  async consultarTodosSetores() {
    return await this.#setorRepository.todos();
  }

  /**
   * Consulta uma instância da entidade Setor através de seu número de ID.
   * 
   * @param {number} id Número de ID da instância a ser consultada.
   * @returns Objeto construido da instância consultada.
   */
  async consultarSetor(id) {
    return await this.#setorRepository.consultar(id);
  }

  /**
   * Consulta setores no sistema por nome.
   * 
   * @param {string} nome String com nome, parcial ou total, para consulta. 
   */
  async consultarSetoresPorNome(nome) {
    return await this.#setorRepository.consultarPorNome(nome);
  }

  /**
   * Atualiza uma instância de setor no sistema.
   * 
   * @param {number} id Número de ID do setor.
   * @param {*} dadosSetor Objeto com dados atualizados.
   * @returns Objeto construido da instância do setor atualizado.
   */
  async atualizarSetor(id, dadosSetor) {
    return await this.#setorRepository.atualizar(id, dadosSetor);
  }

  /**
   * Deleta uma instância de setor no sistema através de seu ID.
   * 
   * @param {number} id Número de ID da setor.
   * @returns Objeto construido da instância de setor em questão.
   */
  async deletarSetor(id) {
    return await this.#setorRepository.deletar(id);
  }

  /////////////////////////////////////////////
  // MÉTODOS DE SERVIÇO DA ENTIDADE 'ESCALA' //
  /////////////////////////////////////////////

  /**
   * Utiliza o repositório de Escala para registrar uma instância deste.
   * 
   * @param {*} dadosEscala Objeto com dados da instância a ser registrada.
   * @returns Objeto construido da entidade ou 'undefined'.
   */
  async registrarEscala(dadosEscala) {
    return await this.#escalaRepository.registrarEscala(dadosEscala);
  }

  /**
   * Retorna todas as instâncias da entidade Escala existentes no sistema.
   */
  async consultarTodosEscalas() {
    return await this.#escalaRepository.todos();
  }

  /**
   * Consulta uma instância da entidade Escala através de seu número de ID.
   * 
   * @param {number} id Número de ID da instância a ser consultada.
   * @returns Objeto construido da instância consultada.
   */
  async consultarEscala(id) {
    return await this.#escalaRepository.consultar(id);
  }

  /**
   * Consulta escalas no sistema por nome.
   * 
   * @param {string} nome String com nome, parcial ou total, para consulta. 
   */
  async consultarEscalaPorNome(nome) {
    return await this.#escalaRepository.consultarPorNome(nome);
  }

  /**
   * Atualiza uma instância de escala no sistema.
   * 
   * @param {number} id Número de ID do escala.
   * @param {*} dadosSetor Objeto com dados atualizados.
   * @returns Objeto construido da instância da escala atualizado.
   */
  async atualizarEscala(id, dadosEscala) {
    return await this.#escalaRepository.atualizar(id, dadosEscala);
  }

  /**
   * Deleta uma instância de escala no sistema através de seu ID.
   * 
   * @param {number} id Número de ID da escala.
   * @returns Objeto construido da instância de escala em questão.
   */
  async deletarEscala(id) {
    return await this.#escalaRepository.deletar(id);
  }
}

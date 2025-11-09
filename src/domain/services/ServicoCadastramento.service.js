import { Injectable, Dependencies } from '@nestjs/common';

import { FuncionarioORMRepository } from '../../adaptInterface/persistence/repositories/FuncionarioORM.repository';
import { EscalaORMRepository } from '../../adaptInterface/persistence/repositories/EscalaORM.repository';
import { FuncaoORMRepository } from '../../adaptInterface/persistence/repositories/FuncaoORM.repository';
import { SetorORMRepository } from '../../adaptInterface/persistence/repositories/SetorORM.repository';
import { UsuarioSistemaORMRepository } from '../../adaptInterface/persistence/repositories/UsuarioSistemaORM.repository';

import { FuncionarioInexistenteError } from '../../adaptInterface/persistence/exceptions/FuncionarioInexistenteError';
import { EscalaInexistenteError } from '../../adaptInterface/persistence/exceptions/EscalaInexistenteError';
import { FuncaoInexistenteError } from '../../adaptInterface/persistence/exceptions/FuncaoInexistenteError';
import { SetorInexistenteError } from '../../adaptInterface/persistence/exceptions/SetorInexistenteError';
import { UsuarioSistemaInexistenteError } from '../../adaptInterface/persistence/exceptions/UsuarioSistemaInexistenteError';

@Injectable()
@Dependencies(
  FuncionarioORMRepository,
  FuncaoORMRepository,
  SetorORMRepository,
  EscalaORMRepository,
  UsuarioSistemaORMRepository
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

  /** Repositório ORM de instâncias da entidade UsuarioSistema */
  #usuarioSistemaRepository;

  constructor(
    funcionarioRepository, 
    funcaoRepository, 
    setorRepository, 
    escalaRepository,
    usuarioSistemaRepository
  ) {
    this.#funcionarioRepository = funcionarioRepository;
    this.#funcaoRepository = funcaoRepository;
    this.#setorRepository = setorRepository;
    this.#escalaRepository = escalaRepository;
    this.#usuarioSistemaRepository = usuarioSistemaRepository;
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
    if (!funcionario) {
      throw new FuncionarioInexistenteError(`Entidade 'Funcionario' inexistente: ID ${id}`);
    }
    funcionario.flag = 1;
    return await this.#funcionarioRepository.atualizar(id, funcionario);
  }

  /**
   * Utiliza o repositório de Funcionários para registrar uma instância deste.
   * 
   * @param {*} dadosFuncionario Objeto com dados da instância a ser registrada.
   * @returns Objeto construido da entidade ou 'undefined'.
   */
  async cadastrarFuncionario(dadosFuncionario) {
    return await this.#funcionarioRepository.cadastrar(dadosFuncionario);
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
    const funcionario = await this.#funcionarioRepository.consultar(id);
    if (!funcionario) {
      throw new FuncionarioInexistenteError(`Entidade 'Funcionario' inexistente: ID ${id}`)
    }
    return funcionario;
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
    const funcionario = await this.#funcionarioRepository.atualizar(id, dadosFuncionario);
    if (!funcionario) {
      throw new FuncionarioInexistenteError(`Entidade 'Funcionario' inexistente: ID ${id}`);
    }
    return funcionario;
  }

  /**
   * Deleta uma instância de funcionário no sistema através de seu ID.
   * 
   * @param {number} id Número de ID do funcionário.
   * @returns Objeto construido da instância de funcionário em questão.
   */
  async deletarFuncionario(id) {
    const funcionario = await this.#funcionarioRepository.deletar(id);
    if (!funcionario) {
      throw new FuncionarioInexistenteError(`Entidade 'Funcionario' inexistente: ID ${id}`);
    }
    return funcionario;
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
  async consultarTodosFuncoes() {
    return await this.#funcaoRepository.todos();
  }

  /**
   * Consulta uma instância da entidade Funcao através de seu número de ID.
   * 
   * @param {number} id Número de ID da instância a ser consultada.
   * @returns Objeto construido da instância consultada.
   */
  async consultarFuncao(id) {
    const funcao = await this.#funcaoRepository.consultar(id);
    if (!funcao) {
      throw new FuncaoInexistenteError(`Entidade 'Funcao' inexistente: ID ${id}`);
    }
    return funcao;
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
    const funcao = await this.#funcaoRepository.atualizar(id, dadosFuncao);
    if (!funcao) {
      throw new FuncaoInexistenteError(`Entidade 'Funcao' inexistente: ID ${id}`);
    }
    return funcao;
  }

  /**
   * Deleta uma instância de função no sistema através de seu ID.
   * 
   * @param {number} id Número de ID da função.
   * @returns Objeto construido da instância de função em questão.
   */
  async deletarFuncao(id) {
    const funcao = await this.#funcaoRepository.deletar(id);
    if (!funcao) {
      throw new FuncaoInexistenteError(`Entidade 'Funcao' inexistente: ID ${id}`);
    }
    return funcao;
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
    const setor = await this.#setorRepository.consultar(id);
    if (!setor) {
      throw new SetorInexistenteError(`Entidade 'Setor' inexistente: ID ${id}`);
    }
    return setor;
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
    const setor = await this.#setorRepository.atualizar(id, dadosSetor);
    if (!setor) {
      throw new SetorInexistenteError(`Entidade 'Setor' inexistente: ID ${id}`);
    }
    return setor;
  }

  /**
   * Deleta uma instância de setor no sistema através de seu ID.
   * 
   * @param {number} id Número de ID da setor.
   * @returns Objeto construido da instância de setor em questão.
   */
  async deletarSetor(id) {
    const setor = await this.#setorRepository.deletar(id);
    if (!setor) {
      throw new SetorInexistenteError(`Entidade 'Setor' inexistente: ID ${id}`);
    }
    return setor;
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
    return await this.#escalaRepository.registrar(dadosEscala);
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
    const escala = await this.#escalaRepository.consultar(id);
    if (!escala) {
      throw new EscalaInexistenteError(`Entidade 'Escala' inexistente: ID ${id}`);
    }
    return escala;
  }

  /**
   * Consulta escalas no sistema por nome.
   * 
   * @param {string} nome String com nome, parcial ou total, para consulta. 
   */
  async consultarEscalasPorNome(nome) {
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
    const escala = await this.#escalaRepository.atualizar(id, dadosEscala);
    if (!escala) {
      throw new EscalaInexistenteError(`Entidade 'Escala' inexistente: ID ${id}`);
    }
    return escala;
  }

  /**
   * Deleta uma instância de escala no sistema através de seu ID.
   * 
   * @param {number} id Número de ID da escala.
   * @returns Objeto construido da instância de escala em questão.
   */
  async deletarEscala(id) {
    const escala = await this.#escalaRepository.deletar(id);
    if (!escala) {
      throw new EscalaInexistenteError(`Entidade 'Escala' inexistente: ID ${id}`);
    }
    return escala;
  }

  /////////////////////////////////////////////////////
  // MÉTODOS DE SERVIÇO DA ENTIDADE 'USUARIOSISTEMA' //
  /////////////////////////////////////////////////////

  /**
   * Utiliza o repositório de UsuarioSistema para registrar uma instância deste.
   * 
   * @param {*} dadosUsuarioSistema Objeto com dados da instância a ser registrada.
   * @returns Objeto construido da entidade ou 'undefined'.
   */
  async registrarUsuarioSistema(dadosUsuarioSistema) {
    return await this.#usuarioSistemaRepository.registrar(dadosUsuarioSistema);
  }

  /**
   * Retorna todas as instâncias da entidade UsuarioSistema existentes no sistema.
   */
  async consultarTodosUsuariosSistema() {
    return await this.#usuarioSistemaRepository.todos();
  }

  /**
   * Consulta uma instância da entidade UsuarioSistema através de seu número de ID.
   * 
   * @param {number} id Número de ID da instância a ser consultada.
   * @returns Objeto construido da instância consultada.
   */
  async consultarUsuarioSistema(id) {
    const usuarioSistema = await this.#usuarioSistemaRepository.consultar(id);
    if (!usuarioSistema) {
      throw new UsuarioSistemaInexistenteError(`Entidade 'UsuarioSistema' inexistente: ID ${id}`);
    }
    return usuarioSistema;
  }

  /**
   * Consulta Usuário do Sistema por nome de usuário.
   * 
   * @param {string} usuario String com usuário, parcial ou total, para consulta. 
   */
  async consultarUsuariosSistemaPorUsuario(usuario) {
    return await this.#usuarioSistemaRepository.consultarPorUsuario(usuario);
  }

  /**
   * Atualiza uma instância de UsuarioSistema no sistema.
   * 
   * @param {number} id Número de ID do UsuarioSistema.
   * @param {*} dadosUsuarioSistema Objeto com dados atualizados.
   * @returns Objeto construido da instância do UsuarioSistema atualizado.
   */
  async atualizarUsuarioSistema(id, dadosUsuarioSistema) {
    const usuarioSistema = await this.#usuarioSistemaRepository.atualizar(id, dadosUsuarioSistema);
    if (!usuarioSistema) {
      throw new UsuarioSistemaInexistenteError(`Entidade 'UsuarioSistema' inexistente: ID ${id}`);
    }
    return usuarioSistema;
  }

  /**
   * Deleta uma instância de UsuarioSistema no sistema através de seu ID.
   * 
   * @param {number} id Número de ID do UsuarioSistema.
   * @returns Objeto construido da instância.
   */
  async deletarUsuarioSistema(id) {
    const usuarioSistema = await this.#usuarioSistemaRepository.deletar(id);
    if (!usuarioSistema) {
      throw new UsuarioSistemaInexistenteError(`Entidade 'UsuarioSistema' inexistente: ID ${id}`);
    }
    return usuarioSistema;
  }
}

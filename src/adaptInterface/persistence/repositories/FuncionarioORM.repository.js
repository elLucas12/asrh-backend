import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Like } from "typeorm";

import { Funcionario } from '../entities/Funcionario.entity';
import { FuncionarioModel } from '../../../domain/entities/Funcionario.model';
import { IFuncionarioModelRepository } from '../../../domain/repositories/IFuncionarioModel.repository';

@Injectable()
@Dependencies(getRepositoryToken(Funcionario))
export class FuncionarioORMRepository extends IFuncionarioModelRepository {
  /** 
   * Array de objetos representando os funcionários armazenados no sistema.
   */
  #funcionariosRepo;

  constructor(funcionarios) {
    super();
    this.#funcionariosRepo = funcionarios;
  }

  /**
   * Cadastra uma instância da entidade Funcionário no banco de dados.
   * 
   * @param {Funcionario} funcionario Objeto de instância da entidade Funcionário.
   * @returns Objeto de modelo populado da entidade Funcionário armazenada.
   */
  async cadastrar(funcionario) {
    const resp = await this.#funcionariosRepo.save(funcionario);
    return FuncionarioORMRepository.createFromObject(resp);
  }

  /**
   * Arquiva uma instância da entidade Funcionário através de sua marcação.
   * 
   * @param {number} id Número de ID da instância da entidade.
   */
  async arquivar(id) {
    const resp = await this.#funcionariosRepo.delete(id);
    if (!resp) {
      return resp;
    }
    return FuncionarioORMRepository.createFromObject(resp);
  }

  /**
   * Deleta uma instância de Funcionário.
   * 
   * @param {number} id Número de ID do Funcionário a ser deletado.
   * @return Obj. de modelo populado da entidade Funcionário.
   */
  async deletar(id) {
    const resp = await this.#funcionariosRepo.delete(id);
    return FuncionarioORMRepository.createFromObject(resp);
  }

  /**
   * Recupera e constrói todas as instâncias de Funcionário armazenados 
   * no sistema.
   * 
   * @return Lista com todos os funcionários registrados, em forma de 
   * objeto já construido.
   */
  async todos() {
    const resp = await this.#funcionariosRepo.find();
    return resp.map(FuncionarioORMRepository.createFromObject);
  }

  /**
   * Modifica uma instância de Funcionário no sistema substituíndo-a por um
   * objeto atualizado.
   */
  async atualizar(id, funcionario) {
    let funcionarioAlvo = await this.#funcionariosRepo.findOneBy({id});
    if (!funcionarioAlvo) {
      return funcionarioAlvo;
    }
    const resp = await this.#funcionariosRepo.save(funcionario);
    return FuncionarioORMRepository.createFromObject(resp);
  }

  /**
   * Consulta UMA instância de Funcionário dentro do banco através do número de ID.
   * 
   * @param {Number} codigo Número de ID da instância a ser consultada.
   * @return Lista/Unidade de obj. consultado.
   */
  async consultar(id) {
    const resp = await this.#funcionariosRepo.findOneBy({id});
    if (!resp) {
      return resp;
    }
    return FuncionarioORMRepository.createFromObject(resp);
  }

  /**
   * Consulta instâncias de Funcionário armazenadas no sistema pelo nome do
   * funcionário.
   * 
   * @param {string} nome Nome de funcionário a ser pesquisado.
   * @returns Lista de instâncias de Funcionário encontradas.
   */
  async consultarPorNome(nome) {
    const resp = await this.#funcionariosRepo.find({
      where: {
        nome: Like(`%${nome}%`)
      }
    });
    return resp.map(FuncionarioORMRepository.createFromObject);
  }

  /**
   * Recebe os parâmetros de origem da entidade Funcionario e retorna o objeto construido.
   * 
   * @param {*} param0 Parâmetros de construção da entidade Funcionario.
   * @return Retorna o objeto de modelo da entidade Funcionario construido.
   */
  static createFromObject({ 
    id,
    nome,
    cpf,
    rg,
    ctps,
    telefone,
    email,
    endereco,
    funcao,
    dataAdmissao,
    dataDemissao,
    flag
   }) {
    let funcionarioEntityModel = new FuncionarioModel(
      id,
      nome,
      cpf,
      rg,
      ctps,
      telefone,
      email,
      endereco,
      funcao,
      dataAdmissao,
      dataDemissao,
      flag
    );
    return funcionarioEntityModel;
  }
}
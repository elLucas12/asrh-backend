import { Injectable, Dependencies } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Like } from "typeorm";

import { Funcao } from "../entities/Funcao.entity";
import { IFuncaoModelRepository } from "../../../domain/repositories/IFuncaoModel.repository";
import { FuncaoModel } from "../../../domain/entities/Funcao.model";
import { SetorModel } from "../../../domain/entities/Setor.model";
import { EscalaModel } from "../../../domain/entities/Escala.model";

@Injectable()
@Dependencies(getRepositoryToken(Funcao))
export class FuncaoORMRepository extends IFuncaoModelRepository {
  /**
   * Objeto que representa as instâncias da entidade Escala armazenadas no sistema.
   */
  #funcaoRepo;
  
  constructor(funcoes) {
    super();
    this.#funcaoRepo = funcoes;
  }

  /**
   * Registra uma instância de entidade Funcao no sistema.
   * 
   * @param {*} funcao Objeto com dados da entidade Funcao.
   * @returns Objeto de resposta da entidade (=entrada).
   */
  async registrar(funcao) {
    const resp = await this.#funcaoRepo.save(funcao);
    return FuncaoORMRepository.createFromObject(resp);
  }

  /**
   * Deleta uma instância da entidade Funcao no armazenamento.
   * 
   * @param {number} id Número de ID da instância Funcao armazenada.
   * @returns Retorna uma objeto da instância deletada.
   */
  async deletar(id) {
    const resp = await this.#funcaoRepo.delete(id);
    if (!resp) {
      return resp;
    }
    return FuncaoORMRepository.createFromObject(resp);
  }
  
  /**
   * Atualiza uma instância da entidade Funcao no armazenamento.
   * 
   * @param {number} id Número de ID da instância Funcao a ser atualizada.
   * @param {*} funcao Novo objeto da instância Funcao (parcial ou completo).
   * @returns Objeto da nstância modificada ou 'undefined'.
   */
  async atualizar(id, funcao) {
    let funcaoAlvo = await this.#funcaoRepo.findOneBy({id});
    if (!funcaoAlvo) {
      return funcaoAlvo;
    }
    const resp = await this.#funcaoRepo.save(funcao);
    return FuncaoORMRepository.createFromObject(resp);
  }
  
  /**
   * Consulta uma instância Funcao no armazenamento através de seu ID.
   * 
   * @param {number} id Número de ID a ser consultado.
   * @returns Instância pesquisada ou 'undefined'.
   */
  async consultar(id) {
    const resp = await this.#funcaoRepo.findOneBy({id});
    if (!resp) {
      return resp;
    }
    return FuncaoORMRepository.createFromObject(resp);
  }

  /**
   * Recupera e constrói todas as instâncias de Funcao armazenadas 
   * no sistema.
   * 
   * @return Lista com todas as Funcao registradas, em forma de 
   * objeto já construido.
   */
  async todos() {
    const resp = await this.#funcaoRepo.find();
    return resp.map(FuncaoORMRepository.createFromObject);
  }
  
  /**
   * Consulta uma instância Funcao, ou mais, por meio de seu nome,
   * 
   * @param {string} nome String com nome inteiro ou parcial da instância(s).
   * @returns Objeto com instância(s) encontrada(s).
   */
  async consultarPorNome(nome) {
    const resp = await this.#funcaoRepo.find({
      where: {
        nome: Like(`%${nome}%`)
      }
    });
    return resp.map(FuncaoORMRepository.createFromObject);
  }

  /**
   * Recebe um objeto com dados e constrói a um objeto da entidade Funcao.
   * 
   * @param {*} param0 Objeto da entidade Funcao.
   * @returns Objeto da entidade Funcao construido.
   */
  static createFromObject({
    id,
    nome,
    salario,
    setor,
    escala
  }) {
    // let setorModel = new SetorModel(
    //   setor.id,
    //   setor.nome,
    //   setor.descricao,
    //   setor.escala
    // );
    // let escalaModel = new EscalaModel(
    //   escala.id,
    //   escala.nome,
    //   escala.horasDiarias,
    //   escala.diasSemana
    // );
    return (new FuncaoModel (
      id,
      nome,
      salario,
      setor,
      escala
    ));
  }
}
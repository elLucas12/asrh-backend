import { Injectable, Dependencies } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Like } from "typeorm";

import { Setor } from "../entities/Setor.entity";
import { ISetorModelRepository } from "../../../domain/repositories/ISetorModel.repository";
import { SetorModel } from "../../../domain/entities/Setor.model";

@Injectable()
@Dependencies(getRepositoryToken(Setor))
export class SetorORMRepository extends ISetorModelRepository {
  /**
   * Objeto que representa as instâncias da entidade Escala armazenadas no sistema.
   */
  #setorRepo;
  
  constructor(setores) {
    super();
    this.#setorRepo = setores;
  }

  /**
   * Registra uma instância de entidade Setor no sistema.
   * 
   * @param {*} setor Objeto com dados da entidade Setor.
   * @returns Objeto de resposta da entidade (=entrada).
   */
  async registrar(setor) {
    const resp = await this.#setorRepo.save(setor);
    return SetorORMRepository.createFromObject(resp);
  }

  /**
   * Deleta uma instância da entidade Setor no armazenamento.
   * 
   * @param {number} id Número de ID da instância Setor armazenada.
   * @returns Retorna uma objeto da instância deletada.
   */
  async deletar(id) {
    const resp = await this.#setorRepo.delete(id);
    if (!resp) {
      return resp;
    }
    return SetorORMRepository.createFromObject(resp);
  }
  
  /**
   * Atualiza uma instância da entidade Setor no armazenamento.
   * 
   * @param {number} id Número de ID da instância Setor a ser atualizada.
   * @param {*} setor Novo objeto da instância Setor (parcial ou completo).
   * @returns Objeto da instância modificada ou 'undefined'.
   */
  async atualizar(id, setor) {
    let setorAlvo = await this.#setorRepo.findOneBy({id});
    if (!setorAlvo) {
      return setorAlvo;
    }
    const resp = await this.#setorRepo.save(setor);
    return SetorORMRepository.createFromObject(resp);
  }
  
  /**
   * Consulta uma instância Setor no armazenamento através de seu ID.
   * 
   * @param {number} id Número de ID a ser consultado.
   * @returns Instância pesquisada ou 'undefined'.
   */
  async consultar(id) {
    const resp = await this.#setorRepo.findOneBy({id});
    if (!resp) {
      return resp;
    }
    return SetorORMRepository.createFromObject(resp);
  }

  /**
   * Recupera e constrói todas as instâncias de Setor armazenadas 
   * no sistema.
   * 
   * @return Lista com todas as Setor registradas, em forma de 
   * objeto já construido.
   */
  async todos() {
    const resp = await this.#setorRepo.find();
    return resp.map(SetorORMRepository.createFromObject);
  }
  
  /**
   * Consulta uma instância Setor, ou mais, por meio de seu nome,
   * 
   * @param {string} nome String com nome inteiro ou parcial da instância(s).
   * @returns Objeto com instância(s) encontrada(s).
   */
  async consultarPorNome(nome) {
    const resp = await this.#setorRepo.find({
      where: {
        nome: Like(`%${nome}%`)
      }
    });
    return resp.map(SetorORMRepository.createFromObject);
  }

  /**
   * Recebe um objeto com dados e constrói a um objeto da entidade Setor.
   * 
   * @param {*} param0 Objeto da entidade Setor.
   * @returns Objeto da entidade Setor construido.
   */
  static createFromObject({
    id,
    nome,
    descricao,
    descricaoAtividade
  }) {
    return (new SetorModel (
      id,
      nome,
      descricao,
      descricaoAtividade
    ));
  }
}
import { Injectable, Dependencies } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";

import { Escala } from "../entities/Escala.entity";
import { IEscalaModelRepository } from "../../../domain/repositories/IEscalaModel.repository";
import { EscalaModel } from "../../../domain/entities/Escala.model";

@Injectable()
@Dependencies(getRepositoryToken(Escala))
export class EscalaORMRepository extends IEscalaModelRepository {
  /**
   * Objeto que representa as instâncias da entidade Escala armazenadas no sistema.
   */
  #escalaRepo;
  
  constructor(escalas) {
    this.#escalaRepo = escalas;
  }

  /**
   * Registra uma instância de entidade Escala no sistema.
   * 
   * @param {*} escala Objeto com dados da entidade Escala.
   * @returns Objeto de resposta da entidade (=entrada).
   */
  async registrar(escala) {
    const resp = await this.#escalaRepo.save(escala);
    return EscalaORMRepository.createFromObject(resp);
  }

  /**
   * Deleta uma instância da entidade Escala no armazenamento.
   * 
   * @param {number} id Número de ID da instância Escala armazenada.
   * @returns Retorna uma objeto da instância deletada.
   */
  async deletar(id) {
    const resp = await this.#escalaRepo.delete(id);
    return EscalaORMRepository.createFromObject(resp);
  }
  
  /**
   * Atualiza uma instância da entidade Escala no armazenamento.
   * 
   * @param {number} id Número de ID da instância Escala a ser atualizada.
   * @param {*} escala Novo objeto da instância escala (parcial ou completo).
   * @returns Objeto da nstância modificada ou 'undefined'.
   */
  async atualizar(id, escala) {
    let escalaAlvo = await this.#escalaRepo.findOneBy({id});
    if (escalaAlvo !== undefined) {
      const resp = await this.#escalaRepo.save(escala);
      return EscalaORMRepository.createFromObject(resp);
    }
  }
  
  /**
   * Consulta uma instância Escala no armazenamento através de seu ID.
   * 
   * @param {number} id Número de ID a ser consultado.
   * @returns Instância pesquisada ou 'undefined'.
   */
  async consultar(id) {
    const resp = await this.#escalaRepo.findOneBy({id});
    return EscalaORMRepository.createFromObject(resp);
  }

  /**
   * Recupera e constrói todas as instâncias de Escala armazenadas 
   * no sistema.
   * 
   * @return Lista com todas as Escalas registradas, em forma de 
   * objeto já construido.
   */
  async todos() {
    const resp = await this.#escalaRepo.find();
    return resp.map(EscalaORMRepository.createFromObject);
  }
  
  /**
   * Consulta uma instância Escala, ou mais, por meio de seu nome,
   * 
   * @param {string} nome String com nome inteiro ou parcial da instância(s).
   * @returns Objeto com instância(s) encontrada(s).
   */
  async consultarPorNome(nome) {
    const resp = await this.#escalaRepo.find({
      where: {
        nome: nome
      }
    });
    return resp.map(EscalaORMRepository.createFromObject);
  }

  /**
   * Recebe um objeto com dados e constrói a um objeto da entidade Escala.
   * 
   * @param {*} param0 Objeto da entidade Escala.
   * @returns Objeto da entidade Escala construido.
   */
  static createFromObject({
    nome,
    horasDiarias,
    diasSemana
  }) {
    return (new EscalaModel (
      nome,
      horasDiarias,
      diasSemana
    ));
  }
}

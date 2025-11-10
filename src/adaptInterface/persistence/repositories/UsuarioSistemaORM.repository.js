import { Injectable, Dependencies } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Like } from "typeorm";

import { UsuarioSistema } from "../entities/UsuarioSistema.entity";
import { IUsuarioSistemaModelRepository } from "../../../domain/repositories/IUsuarioSistemaModel.repository";
import { UsuarioSistemaModel } from "../../../domain/entities/UsuarioSistema.model";

@Injectable()
@Dependencies(getRepositoryToken(UsuarioSistema))
export class UsuarioSistemaORMRepository extends IUsuarioSistemaModelRepository {
  /**
   * Objeto que representa as instâncias da entidade Escala armazenadas no sistema.
   */
  #usuarioSistemaRepo;
  
  constructor(usuariosSistema) {
    super();
    this.#usuarioSistemaRepo = usuariosSistema;
  }

  /**
   * Registra uma instância de entidade UsuarioSistema no sistema.
   * 
   * @param {*} usuarioSistema Objeto com dados da entidade UsuarioSistema.
   * @returns Objeto de resposta da entidade (=entrada).
   */
  async registrar(usuarioSistema) {
    const resp = await this.#usuarioSistemaRepo.save(usuarioSistema);
    return UsuarioSistemaORMRepository.createFromObject(resp);
  }

  /**
   * Deleta uma instância da entidade UsuarioSistema no armazenamento.
   * 
   * @param {number} id Número de ID da instância UsuarioSistema armazenada.
   * @returns Retorna uma objeto da instância deletada.
   */
  async deletar(id) {
    const resp = await this.#usuarioSistemaRepo.delete(id);
    if (!resp) {
      return resp;
    }
    return UsuarioSistemaORMRepository.createFromObject(resp);
  }
  
  /**
   * Atualiza uma instância da entidade UsuarioSistema no armazenamento.
   * 
   * @param {number} id Número de ID da instância a ser atualizada.
   * @param {*} usuarioSistema Novo objeto da instância (parcial ou completo).
   * @returns Objeto da instância modificada ou 'undefined'.
   */
  async atualizar(id, usuarioSistema) {
    let usuarioSistemaAlvo = await this.#usuarioSistemaRepo.findOneBy({id});
    if (!usuarioSistemaAlvo) {
      return usuarioSistemaAlvo;
    }
    const resp = await this.#usuarioSistemaRepo.save(usuarioSistema);
    return UsuarioSistemaORMRepository.createFromObject(resp);
  }
  
  /**
   * Consulta uma instância UsuarioSistema no armazenamento através de seu ID.
   * 
   * @param {number} id Número de ID a ser consultado.
   * @returns Instância pesquisada ou 'undefined'.
   */
  async consultar(id) {
    const resp = await this.#usuarioSistemaRepo.findOneBy({id});
    if (!resp) {
      return resp;
    }
    return UsuarioSistemaORMRepository.createFromObject(resp);
  }

  /**
   * Recupera e constrói todas as instâncias de UsuarioSistema armazenadas 
   * no sistema.
   * 
   * @return Lista com todo UsuarioSistema registrado, em forma de 
   * objeto já construido.
   */
  async todos() {
    const resp = await this.#usuarioSistemaRepo.find();
    return resp.map(UsuarioSistemaORMRepository.createFromObject);
  }
  
  /**
   * Consulta uma instância UsuarioSistema por meio de seu nome,
   * 
   * @param {string} usuario String com nome de usuário inteiro.
   * @returns Objeto com instância(s) encontrada(s).
   */
  async consultarPorUsuario(usuario) {
    const resp = await this.#usuarioSistemaRepo.find({
      where: {
        usuario: usuario
      }
    });
    return UsuarioSistemaORMRepository.createFromObject(resp);
  }

  /**
   * Recebe um objeto com dados e constrói a um objeto da entidade UsuarioSistema.
   * 
   * @param {*} param0 Objeto da entidade UsuarioSistema.
   * @returns Objeto da entidade UsuarioSistema construido.
   */
  static createFromObject({
    id,
    usuario,
    senha
  }) {
    return (new UsuarioSistemaModel (
      id,
      usuario,
      senha
    ));
  }
}
import { Injectable, Dependencies } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento.service";

@Injectable()
@Dependencies(ServicoCadastramento)
export class DeletaUsuarioSistema_UC {
  #servicoCadastramento;

  constructor(servicoCadastramento) {
    this.#servicoCadastramento = servicoCadastramento;
  }

  async run(id) {
    let usuarioSistema = await this.#servicoCadastramento.deletarUsuarioSistema(id);
    return {
      id: usuarioSistema.id,
      usuario: usuarioSistema.usuario,
      // senha: usuarioSistema.senha
    };
  }
}
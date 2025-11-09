import { Injectable, Dependencies } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento.service";

@Injectable()
@Dependencies(ServicoCadastramento)
export class AtualizaUsuarioSistema_UC {
  #servicoCadastramento;

  constructor(servicoCadastramento) {
    this.#servicoCadastramento = servicoCadastramento;
  }

  async run(id, dados) {
    let usuarioSistema = await this.#servicoCadastramento.atualizarUsuarioSistema(id, dados);
    return {
      id: usuarioSistema.id,
      usuario: usuarioSistema.usuario,
      // senha: usuarioSistema.senha
    };
  }
}
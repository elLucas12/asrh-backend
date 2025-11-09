import { Injectable, Dependencies } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento.service";

@Injectable()
@Dependencies(ServicoCadastramento)
export class RegistraUsuarioSistema_UC {
  #servicoCadastramento;

  constructor(servicoCadastramento) {
    this.#servicoCadastramento = servicoCadastramento;
  }

  async run(dados) {
    let usuarioSistema = await this.#servicoCadastramento.registrarUsuarioSistema(dados);
    return {
      id: usuarioSistema.id,
      usuario: usuarioSistema.usuario,
      // senha: usuarioSistema.senha
    };
  }
}
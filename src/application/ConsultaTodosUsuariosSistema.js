import { Injectable, Dependencies } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento.service";

@Injectable()
@Dependencies(ServicoCadastramento)
export class ConsultaTodosUsuariosSistema_UC {
  #servicoCadastramento;

  constructor(servicoCadastramento) {
    this.#servicoCadastramento = servicoCadastramento;
  }

  async run() {
    let usuariosSistema = await this.#servicoCadastramento.consultarTodosUsuariosSistema();
    return usuariosSistema.map((usuarioSistema) => {
      return {
        id: usuarioSistema.id,
        usuario: usuarioSistema.usuario,
        // senha: usuarioSistema.senha
      };
    });
  }
}
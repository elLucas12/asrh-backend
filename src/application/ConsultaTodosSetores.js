import { Injectable, Dependencies } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento.service";

@Injectable()
@Dependencies(ServicoCadastramento)
export class ConsultaTodosSetores_UC {
  #servicoCadastramento;

  constructor(servicoCadastramento) {
    this.#servicoCadastramento = servicoCadastramento;
  }

  async run() {
    let setores = await this.#servicoCadastramento.consultarTodosSetores();
    return setores.map((setor) => {
      return {
        id: setor.id,
        nome: setor.nome,
        descricao: setor.descricao,
        descricaoAtividades: setor.descricaoAtividades
      };
    });
  }
}
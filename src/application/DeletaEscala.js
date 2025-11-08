import { Injectable, Dependencies } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento.service";

@Injectable()
@Dependencies(ServicoCadastramento)
export class DeletaEscala_UC {
  /** Objeto do Serviço de Cadastramento de pessoal. */
  #servicoCadastramento;

  constructor(servicoCadastramento) {
    this.#servicoCadastramento = servicoCadastramento;
  }

  async run(id) {
    let escala = await this.#servicoCadastramento.deletarEscala(id);
    return {
      id: escala.id,
      nome: escala.nome,
      horasDiarias: escala.horasDiarias,
      diasSemana: escala.diasSemana
    };
  }
}
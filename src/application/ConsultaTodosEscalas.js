import { Injectable, Dependencies } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento.service";

@Injectable()
@Dependencies(ServicoCadastramento)
export class ConsultaTodosEscalas_UC {
  #servicoCadastramento;

  constructor(servicoCadastramento) {
    this.#servicoCadastramento = servicoCadastramento;
  }

  async run() {
    let escalas = await this.#servicoCadastramento.consultarTodosEscalas();
    return escalas.map((escala) => {
      return {
        id: escala.id,
        nome: escala.nome,
        horasDiarias: escala.horasDiarias,
        diasSemana: escala.diasSemana
      };
    });
  }
}
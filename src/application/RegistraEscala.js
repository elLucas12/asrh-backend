import { Injectable, Dependencies } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento.service";

@Injectable()
@Dependencies(ServicoCadastramento)
export class RegistraEscala_UC {
  #servicoCadastramento;

  constructor(servicoCadastramento) {
    this.#servicoCadastramento = servicoCadastramento;
  }

  async run(dados) {
    let dadosEscala = {
      nome: dados.nome,
      horasDiarias: dados.horasDiarias,
      diasSemana: dados.diasSemana
    };
    let escala = await this.#servicoCadastramento.registrarEscala(dadosEscala);
    return {
      id: escala.id,
      nome: escala.nome,
      horasDiarias: escala.horasDiarias,
      diasSemana: escala.diasSemana
    };
  }
}
import { Injectable, Dependencies } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento.service";

@Injectable()
@Dependencies(ServicoCadastramento)
export class RegistraFuncao_UC {
  #servicoCadastramento;

  constructor(servicoCadastramento) {
    this.#servicoCadastramento = servicoCadastramento;
  }

  async run(dados) {
    let dadosSetor = {
      nome: dados.nome,
      salario: dados.salario,
      setor: dados.setor,
      setor: dados.escala
    };
  }
}
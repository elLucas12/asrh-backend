import { Injectable, Dependencies } from "@nextjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento.service";

@Injectable()
@Dependencies(ServicoCadastramento)
export class RegistraSetor_UC {
  #servicoCadastramento;

  constructor(servicoCadastramento) {
    this.#servicoCadastramento = servicoCadastramento;
  }

  async run(dados) {
    let dadosSetor = {
      nome: dados.nome,
      descricao: dados.descricao,
      descricaoAtividades: dados.descricaoAtividades
    };
    
  }
}
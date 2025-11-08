import { Injectable, Dependencies } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento.service";

@Injectable()
@Dependencies(ServicoCadastramento)
export class ConsultaSetor_UC {
  /** Objeto do Serviço de Cadastramento de pessoal. */
  #servicoCadastramento;

  constructor(servicoCadastramento) {
    this.#servicoCadastramento = servicoCadastramento;
  }

  async run(id) {
    let setor = await this.#servicoCadastramento.consultarSetor(id);
    return {
      id: setor.id,
      nome: setor.nome,
      descricao: setor.descricao,
      descricaoAtividades: setor.descricaoAtividades
    };
  }
}
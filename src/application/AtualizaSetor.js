import { Injectable, Dependencies } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento.service";

@Injectable()
@Dependencies(ServicoCadastramento)
export class AtualizaSetor_UC {
  /** Objeto do Serviço de Cadastramento de pessoal. */
  #servicoCadastramento;

  constructor(servicoCadastramento) {
    this.#servicoCadastramento = servicoCadastramento;
  }

  async run(id, dados) {
    let setor = await this.#servicoCadastramento.atualizarSetor(id, dados);
    return {
      id: setor.id,
      nome: setor.nome,
      descricao: setor.descricao,
      descricaoAtividades: setor.descricaoAtividades
    };
  }
}
import { Injectable, Dependencies } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento.service";

@Injectable()
@Dependencies(ServicoCadastramento)
export class ConsultaFuncao_UC {
  /** Objeto do Serviço de Cadastramento de pessoal. */
  #servicoCadastramento;

  constructor(servicoCadastramento) {
    this.#servicoCadastramento = servicoCadastramento;
  }

  async run(id) {
    let funcao = await this.#servicoCadastramento.consultarFuncao(id);
    return {
      id: funcao.id,
      nome: funcao.nome,
      salario: funcao.salario,
      setor: {
        id: funcao.setor.id,
        nome: funcao.setor.nome,
        descricao: funcao.setor.descricao,
        descricaoAtividades: funcao.setor.descricaoAtividades
      },
      escala: {
        id: funcao.escala.id,
        nome: funcao.escala.nome,
        horasDiarias: funcao.escala.horasDiarias,
        diasSemana: funcao.escala.diasSemana
      }
    };
  }
}
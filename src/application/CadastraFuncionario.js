import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoCadastramento } from '../domain/services/ServicoCadastramento.service';

@Injectable()
@Dependencies(ServicoCadastramento)
export class CadastraFuncionario_UC {
  #servicoCadastramento;

  constructor(servicoCadastramento) {
    this.#servicoCadastramento = servicoCadastramento;
  }
  
  async run(dados) {
    let dadosFuncionario = {
      nome: dados.nome,
      cpf: dados.cpf,
      rg: dados.rg,
      ctps: dados.ctps,
      telefone: dados.telefone,
      email: dados.email,
      endereco: dados.endereco,
      salario: dados.salario,
      escala: dados.escala,
      funcao: dados.funcao,
      setor: dados.setor
    };
    let funcionario = await this.#servicoCadastramento.cadastrarFuncionario(dadosFuncionario);
    return dadosFuncionario;
  }
}
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
      funcao: dados.funcao,
      dataAdmissao: dados.dataAdmissao,
      dataDemissao: dados.dataDemissao
    };
    let funcionario = await this.#servicoCadastramento.cadastrarFuncionario(dadosFuncionario);
    return {
      id: funcionario.id,
      nome: funcionario.nome,
      cpf: funcionario.cpf,
      rg: funcionario.rg,
      ctps: funcionario.ctps,
      telefone: funcionario.telefone,
      email: funcionario.email,
      endereco: funcionario.endereco,
      funcao: {
        id: funcionario.funcao.id,
        nome: funcionario.funcao.nome,
        setor: {
          id: funcionario.funcao.setor.id,
          nome: funcionario.funcao.setor.nome,
          descricao: funcionario.funcao.setor.descricao,
          descricaoAtividades: funcionario.funcao.setor.descricaoAtividades
        },
        escala: {
          id: funcionario.funcao.escala.id,
          nome: funcionario.funcao.escala.nome,
          horasDiarias: funcionario.funcao.escala.horasDiarias,
          diasSemana: funcionario.funcao.escala.diasSemana
        }
      },
      dataAdmissao: funcionario.dataAdmissao,
      dataDemissao: funcionario.dataDemissao
    };
  }
}
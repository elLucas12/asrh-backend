import { Controller, Dependencies, Get, Post, Patch, Bind, Body, Param, NotFoundException } from '@nestjs/common';
import { CadastraFuncionario_UC } from '../../application/CadastraFuncionario';

@Controller()
@Dependencies(
  CadastraFuncionario_UC
)
export class AppController {
  constructor(cadastraFuncionarioUC) {
    this.cadastraFuncionarioUC = cadastraFuncionarioUC;
  }

  /**
   * Cria uma instância de Funcionário no sistema.
   *
   * O corpo da requisição HTTP deve seguir o seguinte esquema padrão: 
   * {
   *  nome: 'nome_funcionário', 
   *  cpf: 'nro_cpf',
   *  rg: 'nro_rg',
   *  ctps: 'nro_ctps',
   *  telefone: 'nro_tel',
   *  email: 'end_de_email',
   *  endereco: 'endereco_func',
   *  funcao: id_da_funcao
   * }
   *
   * @param {Array} dados Corpo de requisição informações do usuário.
   * @return Cadastro completo do usuário em JSON no esquema [{'usuario', 'senha'}]
   */
  @Post('funcionarios/cadastrar')
  @Bind(Body())
  async postCadastrarFuncionario(dados) {
    return this.cadastraFuncionarioUC.run(dados);
  }
}

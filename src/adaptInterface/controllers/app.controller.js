import { Controller, Dependencies, Get, Post, Patch, Bind, Body, Param, NotFoundException } from '@nestjs/common';

import { CadastraFuncionario_UC } from '../../application/CadastraFuncionario';
import { ConsultaTodosFuncionarios_UC } from '../../application/ConsultaTodosFuncionarios';
import { AtualizaFuncionario_UC } from '../../application/AtualizaFuncionario';
import { ConsultaFuncionario_UC } from '../../application/ConsultaFuncionario';

import { RegistraEscala_UC } from '../../application/RegistraEscala';
import { ConsultaTodosEscala_UC } from '../../application/ConsultaTodosEscala';
import { ConsultaEscala_UC } from '../../application/ConsultaEscala';
import { AtualizaEscala_UC } from '../../application/AtualizaEscala';

@Controller()
@Dependencies(
  CadastraFuncionario_UC,
  ConsultaTodosFuncionarios_UC,
  AtualizaFuncionario_UC,
  ConsultaFuncionario_UC,
  RegistraEscala_UC,
  ConsultaTodosEscala_UC,
  ConsultaEscala_UC,
  AtualizaEscala_UC
)
export class AppController {
  constructor(
    cadastraFuncionarioUC,
    consultaTodosFuncionariosUC,
    atualizaFuncionarioUC,
    consultaFuncionarioUC,
    registraEscalaUC,
    consultaTodosEscalasUC,
    consultaEscalaUC,
    atualizaEscalaUC
    
  ) {
    this.cadastraFuncionarioUC = cadastraFuncionarioUC;
    this.consultaTodosFuncionariosUC = consultaTodosFuncionariosUC;
    this.atualizaFuncionarioUC = atualizaFuncionarioUC;
    this.consultaFuncionarioUC = consultaFuncionarioUC;
    this.registraEscalaUC = registraEscalaUC;
    this.consultaTodosEscalasUC = consultaTodosEscalasUC;
    this.consultaEscalaUC = consultaEscalaUC;
    this.atualizaEscalaUC = atualizaEscalaUC;
  }

  /////////////////////////////////////////
  // ENDPOINTS DA ENTIDADE 'FUNCIONARIO' //
  /////////////////////////////////////////

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
   * @return Cadastro completo do usuário em JSON.
   */
  @Post('funcionarios/cadastrar')
  @Bind(Body())
  async postCadastrarFuncionario(dados) {
    return this.cadastraFuncionarioUC.run(dados);
  }

  @Get('funcionarios')
  async getFuncionarios(dados) {
    return this.consultaTodosFuncionariosUC.run();
  }

  @Patch('funcionarios/:id')
  @Bind(Param(), Body())
  async patchAtualizarFuncionario(param, dados) {
    return this.atualizaFuncionarioUC.run(param.id, dados);
  }

  @Get('funcionarios/:id')
  @Bind(Param())
  async getFuncionarioPorId(param) {
    return this.consultaFuncionarioUC.run(param.id);
  }

  ////////////////////////////////////
  // ENDPOINTS DA ENTIDADE 'ESCALA' //
  ////////////////////////////////////

  /**
   * Cria uma instância de Escala no sistema.
   *
   * O corpo da requisição HTTP deve seguir o seguinte esquema padrão: 
   * {
   *  nome: 'nome_funcionário', 
   *  horasDiarias: xx,
   *  diasSemana: xx
   * }
   *
   * @param {Array} dados Corpo de requisição informações do usuário.
   * @return Cadastro completo do usuário em JSON no esquema [{'usuario', 'senha'}]
   */
  @Post('escalas/registrar')
  @Bind(Body())
  async postRegistrarEscala(dados) {
    return this.registraEscalaUC.run(dados);
  }

  @Get('escalas')
  async getEscalas(dados) {
    return this.consultaTodosEscalasUC.run();
  }

  @Patch('escalas/:id')
  @Bind(Param(), Body())
  async patchAtualizarEscala(param, dados) {
    return this.atualizaEscalaUC.run(param.id, dados);
  }

  @Get('escalas/:id')
  @Bind(Param())
  async getEscalaPorId(param) {
    return this.consultaEscalaUC(param.id);
  }

  ////////////////////////////////////
  // ENDPOINTS DA ENTIDADE 'FUNCAO' //
  ////////////////////////////////////

  ///////////////////////////////////
  // ENDPOINTS DA ENTIDADE 'SETOR' //
  ///////////////////////////////////
}

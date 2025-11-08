import { Controller, Dependencies, Get, Post, Put, Delete, Bind, Body, Param, NotFoundException } from '@nestjs/common';

import { CadastraFuncionario_UC } from '../../application/CadastraFuncionario';
import { ConsultaTodosFuncionarios_UC } from '../../application/ConsultaTodosFuncionarios';
import { AtualizaFuncionario_UC } from '../../application/AtualizaFuncionario';
import { ConsultaFuncionario_UC } from '../../application/ConsultaFuncionario';

import { RegistraEscala_UC } from '../../application/RegistraEscala';
import { ConsultaTodosEscalas_UC } from '../../application/ConsultaTodosEscalas';
import { ConsultaEscala_UC } from '../../application/ConsultaEscala';
import { AtualizaEscala_UC } from '../../application/AtualizaEscala';
import { DeletaFuncionario_UC } from '../../application/DeletaFuncionario';
import { DeletaEscala_UC } from '../../application/DeletaEscala';
import { RegistraFuncao_UC } from '../../application/RegistraFuncao';
import { ConsultaTodosFuncoes_UC } from '../../application/ConsultaTodosFuncoes';
import { ConsultaFuncao_UC } from '../../application/ConsultaFuncao';
import { AtualizaFuncao_UC } from '../../application/AtualizaFuncao';
import { DeletaFuncao_UC } from '../../application/DeletaFuncao';
import { RegistraSetor_UC } from '../../application/RegistraSetor';
import { ConsultaTodosSetores_UC } from '../../application/ConsultaTodosSetores';
import { ConsultaSetor_UC } from '../../application/ConsultaSetor';
import { AtualizaSetor_UC } from '../../application/AtualizaSetor';
import { DeletaSetor_UC } from '../../application/DeletaSetor';

@Controller()
@Dependencies(
  CadastraFuncionario_UC,
  ConsultaTodosFuncionarios_UC,
  AtualizaFuncionario_UC,
  ConsultaFuncionario_UC,
  DeletaFuncionario_UC,

  RegistraFuncao_UC,
  ConsultaTodosFuncoes_UC,
  ConsultaFuncao_UC,
  AtualizaFuncao_UC,
  DeletaFuncao_UC,

  RegistraSetor_UC,
  ConsultaTodosSetores_UC,
  ConsultaSetor_UC,
  AtualizaSetor_UC,
  DeletaSetor_UC,

  RegistraEscala_UC,
  ConsultaTodosEscalas_UC,
  ConsultaEscala_UC,
  AtualizaEscala_UC,
  DeletaEscala_UC
)
export class AppController {
  constructor(
    cadastraFuncionarioUC,
    consultaTodosFuncionariosUC,
    atualizaFuncionarioUC,
    consultaFuncionarioUC,
    deletaFuncionarioUC,

    registraFuncaoUC,
    consultaTodosFuncoesUC,
    consultaFuncaoUC,
    atualizaFuncaoUC,
    deletaFuncaoUC,

    registraSetorUC,
    consultaTodosSetoresUC,
    consultaSetorUC,
    atualizaSetorUC,
    deletaSetorUC,

    registraEscalaUC,
    consultaTodosEscalasUC,
    consultaEscalaUC,
    atualizaEscalaUC,
    deletaEscalaUC
  ) {
    this.cadastraFuncionarioUC = cadastraFuncionarioUC;
    this.consultaTodosFuncionariosUC = consultaTodosFuncionariosUC;
    this.atualizaFuncionarioUC = atualizaFuncionarioUC;
    this.consultaFuncionarioUC = consultaFuncionarioUC;
    this.deletaFuncionarioUC = deletaFuncionarioUC;

    this.registraFuncaoUC = registraFuncaoUC;
    this.consultaTodosFuncoesUC = consultaTodosFuncoesUC;
    this.consultaFuncaoUC = consultaFuncaoUC;
    this.atualizaFuncaoUC = atualizaFuncaoUC;
    this.deletaFuncaoUC = deletaFuncaoUC;

    this.registraSetorUC = registraSetorUC;
    this.consultaTodosSetoresUC = consultaTodosSetoresUC;
    this.consultaSetorUC = consultaSetorUC;
    this.atualizaSetorUC = atualizaSetorUC;
    this.deletaSetorUC = deletaSetorUC;

    this.registraEscalaUC = registraEscalaUC;
    this.consultaTodosEscalasUC = consultaTodosEscalasUC;
    this.consultaEscalaUC = consultaEscalaUC;
    this.atualizaEscalaUC = atualizaEscalaUC;
    this.deletaEscalaUC = deletaEscalaUC;
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

  @Put('funcionarios/:id')
  @Bind(Param(), Body())
  async patchAtualizarFuncionario(param, dados) {
    return this.atualizaFuncionarioUC.run(param.id, dados);
  }

  @Get('funcionarios/:id')
  @Bind(Param())
  async getFuncionarioPorId(param) {
    return this.consultaFuncionarioUC.run(param.id);
  }

  @Delete('funcionarios/:id')
  @Bind(Param())
  async deleteFuncionarioPorId(param) {
    return this.deletaFuncionarioUC.run(param.id);
  }

  ////////////////////////////////////
  // ENDPOINTS DA ENTIDADE 'FUNCAO' //
  ////////////////////////////////////

  @Post('funcoes/registrar')
  @Bind(Body())
  async postRegistrarFuncao(dados) {
    return this.registraFuncaoUC.run(dados);
  }

  @Get('funcoes')
  async getFuncoes(dados) {
    return this.consultaTodosFuncoesUC.run();
  }

  @Put('funcoes/:id')
  @Bind(Param(), Body())
  async patchAtualizarFuncao(param, dados) {
    return this.atualizaFuncaoUC.run(param.id, dados);
  }

  @Get('funcoes/:id')
  @Bind(Param())
  async getFuncaoPorId(param) {
    return this.consultaFuncaoUC.run(param.id);
  }

  @Delete('funcoes/:id')
  @Bind(Param())
  async deleteFuncaoPorId(param) {
    return this.deletaFuncaoUC.run(param.id);
  }

  ///////////////////////////////////
  // ENDPOINTS DA ENTIDADE 'SETOR' //
  ///////////////////////////////////

  @Post('setores/registrar')
  @Bind(Body())
  async postRegistrarSetor(dados) {
    return this.registraSetorUC.run(dados);
  }

  @Get('setores')
  async getSetores(dados) {
    return this.consultaTodosSetoresUC.run();
  }

  @Put('setores/:id')
  @Bind(Param(), Body())
  async patchAtualizarSetor(param, dados) {
    return this.atualizaSetorUC.run(param.id, dados);
  }

  @Get('setores/:id')
  @Bind(Param())
  async getSetorPorId(param) {
    return this.consultaSetorUC.run(param.id);
  }

  @Delete('setores/:id')
  @Bind(Param())
  async deleteSetorPorId(param) {
    return this.deletaSetorUC.run(param.id);
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

  @Put('escalas/:id')
  @Bind(Param(), Body())
  async patchAtualizarEscala(param, dados) {
    return this.atualizaEscalaUC.run(param.id, dados);
  }

  @Get('escalas/:id')
  @Bind(Param())
  async getEscalaPorId(param) {
    return this.consultaEscalaUC.run(param.id);
  }

  @Delete('escalas/:id')
  @Bind(Param())
  async deleteEscalaPorId(param) {
    return this.deletaEscalaUC.run(param.id);
  }
}

import { 
  Controller, 
  Dependencies, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Bind, 
  Body, 
  Param, 
  Logger,
  HttpStatus,
  HttpCode,
  NotFoundException,
  ParseIntPipe,
  Res
} from '@nestjs/common';

// Funcionário
import { CadastraFuncionario_UC } from '../../application/CadastraFuncionario';
import { ConsultaTodosFuncionarios_UC } from '../../application/ConsultaTodosFuncionarios';
import { AtualizaFuncionario_UC } from '../../application/AtualizaFuncionario';
import { ConsultaFuncionario_UC } from '../../application/ConsultaFuncionario';
import { DeletaFuncionario_UC } from '../../application/DeletaFuncionario';

import { FuncionarioInexistenteError } from '../persistence/exceptions/FuncionarioInexistenteError';
import { FuncionarioValidatorPipe } from '../persistence/entities/Funcionario.validator';
import { FuncionarioCadastrarDtoSchema } from '../persistence/entities/FuncionarioCadastrar.dto';

// Escala
import { RegistraEscala_UC } from '../../application/RegistraEscala';
import { ConsultaTodosEscalas_UC } from '../../application/ConsultaTodosEscalas';
import { ConsultaEscala_UC } from '../../application/ConsultaEscala';
import { AtualizaEscala_UC } from '../../application/AtualizaEscala';
import { DeletaEscala_UC } from '../../application/DeletaEscala';

// Função
import { RegistraFuncao_UC } from '../../application/RegistraFuncao';
import { ConsultaTodosFuncoes_UC } from '../../application/ConsultaTodosFuncoes';
import { ConsultaFuncao_UC } from '../../application/ConsultaFuncao';
import { AtualizaFuncao_UC } from '../../application/AtualizaFuncao';
import { DeletaFuncao_UC } from '../../application/DeletaFuncao';

// Setor
import { RegistraSetor_UC } from '../../application/RegistraSetor';
import { ConsultaTodosSetores_UC } from '../../application/ConsultaTodosSetores';
import { ConsultaSetor_UC } from '../../application/ConsultaSetor';
import { AtualizaSetor_UC } from '../../application/AtualizaSetor';
import { DeletaSetor_UC } from '../../application/DeletaSetor';

// Usuário Sistema
import { RegistraUsuarioSistema_UC } from '../../application/RegistraUsuarioSistema';
import { ConsultaTodosUsuariosSistema_UC } from '../../application/ConsultaTodosUsuariosSistema';
import { ConsultaUsuarioSistema_UC } from '../../application/ConsultaUsuarioSistema';
import { AtualizaUsuarioSistema_UC } from '../../application/AtualizaUsuarioSistema';
import { DeletaUsuarioSistema_UC } from '../../application/DeletaUsuarioSistema';

import { UsuarioSistemaValidatorPipe } from '../persistence/entities/UsuarioSistema.validator';
import { UsuarioSistemaRegistrarDtoSchema } from '../persistence/entities/UsuarioSistemaRegistrar.dto';

import { EscalaInexistenteError } from '../persistence/exceptions/EscalaInexistenteError';
import { FuncaoInexistenteError } from '../persistence/exceptions/FuncaoInexistenteError';
import { SetorInexistenteError } from '../persistence/exceptions/SetorInexistenteError';
import { UsuarioSistemaInexistenteError } from '../persistence/exceptions/UsuarioSistemaInexistenteError';
import { FuncaoValidatorPipe } from '../persistence/entities/Funcao.validator';
import { FuncaoCadastrarDtoSchema } from '../persistence/entities/FuncaoRegistrar.dto';
import { SetorValidatorPipe } from '../persistence/entities/Setor.validator';
import { SetorRegistrarDtoSchema } from '../persistence/entities/SetorRegistrar.dto';
import { EscalaValidatorPipe } from '../persistence/entities/Escala.validator';
import { EscalaRegistrarDtoSchema } from '../persistence/entities/EscalaRegistrar.dto';

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
  DeletaEscala_UC,

  RegistraUsuarioSistema_UC,
  ConsultaTodosUsuariosSistema_UC,
  ConsultaUsuarioSistema_UC,
  AtualizaUsuarioSistema_UC,
  DeletaUsuarioSistema_UC
)
export class AppController {
  #logger;

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
    deletaEscalaUC, 

    registraUsuarioSistemaUC,
    consultaTodosUsuariosSistemaUC,
    consultaUsuarioSistemaUC,
    atualizaUsuarioSistemaUC,
    deletaUsuarioSistemaUC
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

    this.registraUsuarioSistemaUC = registraUsuarioSistemaUC;
    this.consultaTodosUsuariosSistemaUC = consultaTodosUsuariosSistemaUC;
    this.consultaUsuarioSistemaUC = consultaUsuarioSistemaUC;
    this.atualizaUsuarioSistemaUC = atualizaUsuarioSistemaUC;
    this.deletaUsuarioSistemaUC = deletaUsuarioSistemaUC;

    this.#logger = new Logger(AppController.name);
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
  @Bind(
    Body(new FuncionarioValidatorPipe(FuncionarioCadastrarDtoSchema))
  )
  async postCadastrarFuncionario(dados) {
    return this.cadastraFuncionarioUC.run(dados);
  }

  @Get('funcionarios')
  async getFuncionarios() {
    return this.consultaTodosFuncionariosUC.run();
  }

  @Put('funcionarios/:id')
  @Bind(
    Param('id', ParseIntPipe), 
    Body(new FuncionarioValidatorPipe(FuncionarioCadastrarDtoSchema))
  )
  async putAtualizarFuncionario(id, dados) {
    try {
      this.#logger.log(`[PUT] Funcionário id: ${id}, dados: "${dados}"`);
      return await this.atualizaFuncionarioUC.run(id, dados);
    } catch (error) {
      if (error instanceof FuncionarioInexistenteError) {
        throw new NotFoundException('Funcionário não existe no sistema!', {
          cause: error
        });
      }
      throw error;
    }
  }

  @Get('funcionarios/:id')
  @Bind(Param('id', ParseIntPipe))
  async getFuncionarioPorId(id) {
    try {
      this.#logger.log(`[GET] Funcionário id: ${id}`);
      return await this.consultaFuncionarioUC.run(id);
    } catch (error) {
      if (error instanceof FuncionarioInexistenteError) {
        throw new NotFoundException('Funcionário não existe no sistema!', {
          cause: error
        });
      }
      throw error;
    }
  }

  @Delete('funcionarios/:id')
  @Bind(Param('id', ParseIntPipe))
  async deleteFuncionarioPorId(id) {
    try {
      this.#logger.log(`[DELETE] Funcionário id: ${id}`);
      return await this.deletaFuncionarioUC.run(id);
    } catch (error) {
      if (error instanceof FuncionarioInexistenteError) {
        throw new NotFoundException('Funcionário não existe no sistema!', {
          cause: error
        });
      }
      throw error;
    }
  }

  ////////////////////////////////////
  // ENDPOINTS DA ENTIDADE 'FUNCAO' //
  ////////////////////////////////////

  @Post('funcoes/registrar')
  @Bind(
    Body(new FuncaoValidatorPipe(FuncaoCadastrarDtoSchema))
  )
  async postRegistrarFuncao(dados) {
    return this.registraFuncaoUC.run(dados);
  }

  @Get('funcoes')
  async getFuncoes() {
    return this.consultaTodosFuncoesUC.run();
  }

  @Put('funcoes/:id')
  @Bind(
    Param('id', ParseIntPipe), 
    Body(new FuncaoValidatorPipe(FuncaoCadastrarDtoSchema))
  )
  async putAtualizarFuncao(id, dados) {
    try {
      this.#logger.log(`[PUT] Função id: ${id}, dados: "${dados}"`);
      return await this.atualizaFuncaoUC.run(id, dados);
    } catch (error) {
      if (error instanceof FuncaoInexistenteError) {
        throw new NotFoundException('Função não existe no sistema!', {
          cause: error
        });
      }
      throw error;
    }
  }

  @Get('funcoes/:id')
  @Bind(Param('id', ParseIntPipe))
  async getFuncaoPorId(id) {
    try {
      this.#logger.log(`[GET] Função id: ${id}`);
      return await this.consultaFuncaoUC.run(id);
    } catch (error) {
      if (error instanceof FuncaoInexistenteError) {
        throw new NotFoundException('Função não existe no sistema!', {
          cause: error
        });
      }
      throw error;
    }
  }

  @Delete('funcoes/:id')
  @Bind(Param('id', ParseIntPipe))
  async deleteFuncaoPorId(id) {
    try {
      this.#logger.log(`[DELETE] Função id: ${id}`);
      return await this.deletaFuncaoUC.run(id);
    } catch (error) {
      if (error instanceof FuncaoInexistenteError) {
        throw new NotFoundException('Função não existe no sistema!', {
          cause: error
        });
      }
      throw error;
    }
  }

  ///////////////////////////////////
  // ENDPOINTS DA ENTIDADE 'SETOR' //
  ///////////////////////////////////

  @Post('setores/registrar')
  @Bind(
    Body(new SetorValidatorPipe(SetorRegistrarDtoSchema))
  )
  async postRegistrarSetor(dados) {
    try {
      this.#logger.log(`[POST] Setor dados: ${dados}`);
      return await this.registraSetorUC.run(dados);
    } catch (error) {
      throw error;
    }
  }

  @Get('setores')
  async getSetores() {
    return this.consultaTodosSetoresUC.run();
  }

  @Put('setores/:id')
  @Bind(
    Param('id', ParseIntPipe), 
    Body(new SetorValidatorPipe(SetorRegistrarDtoSchema))
  )
  async putAtualizarSetor(id, dados) {
    try {
      this.#logger.log(`[PUT] Setor id: ${id}, dados: "${dados}"`);
      return await this.atualizaSetorUC.run(id, dados);
    } catch (error) {
      if (error instanceof SetorInexistenteError) {
        throw new NotFoundException('Setor não existe no sistema!', {
          cause: error
        });
      }
      throw error;
    }
    
  }

  @Get('setores/:id')
  @Bind(Param('id', ParseIntPipe))
  async getSetorPorId(id) {
    try {
      this.#logger.log(`[GET] Setor id: ${id}`);
      return await this.consultaSetorUC.run(id);
    } catch (error) {
      if (error instanceof SetorInexistenteError) {
        throw new NotFoundException('Setor não existe no sistema!', {
          cause: error
        });
      }
      throw error;
    }
  }

  @Delete('setores/:id')
  @Bind(Param('id', ParseIntPipe))
  async deleteSetorPorId(id) {
    try {
      this.#logger.log(`[DELETE] Setor id: ${id}`);
      return await this.deletaSetorUC.run(id);
    } catch (error) {
      if (error instanceof SetorInexistenteError) {
        throw new NotFoundException('Setor não existe no sistema!', {
          cause: error
        });
      }
      throw error;
    }
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
  @Bind(
    Body(new EscalaValidatorPipe(EscalaRegistrarDtoSchema))
  )
  async postRegistrarEscala(dados) {
    return this.registraEscalaUC.run(dados);
  }

  @Get('escalas')
  async getEscalas() {
    return this.consultaTodosEscalasUC.run();
  }

  @Put('escalas/:id')
  @Bind(
    Param('id', ParseIntPipe), 
    Body(new EscalaValidatorPipe(EscalaRegistrarDtoSchema))
  )
  async putAtualizarEscala(id, dados) {
    try { 
      this.#logger.log(`[PUT] Escala ID ${id}, dados: ${dados}`);
      return await this.atualizaEscalaUC.run(id, dados);
    } catch (error) {
      if (error instanceof EscalaInexistenteError) {
        throw new NotFoundException('Escala não existe no sistema!', {
          cause: error
        })
      }
      throw error;
    }
  }

  @Get('escalas/:id')
  @Bind(Param('id', ParseIntPipe))
  async getEscalaPorId(id) {
    try {
      this.#logger.log(`[GET] Escala ID ${id}`);
      return await this.consultaEscalaUC.run(id);
    } catch (error) {
      if (error instanceof EscalaInexistenteError) {
        throw new NotFoundException('Escala não existe no sistema!', {
          cause: error
        });
      }
      throw error;
    }
  }

  @Delete('escalas/:id')
  @Bind(Param('id', ParseIntPipe))
  async deleteEscalaPorId(id) {
    try { 
      this.#logger.log(`[DELETE] Escala ID ${id}`);
      return await this.deletaEscalaUC.run(id);;
    } catch (error) {
      if (error instanceof EscalaInexistenteError) {
        throw new NotFoundException('Escala não existe no sistema!', {
          cause: error
        })
      }
      throw error;
    }
  }

  ////////////////////////////////////////////
  // ENDPOINTS DA ENTIDADE 'UsuarioSistema' //
  ////////////////////////////////////////////
  /**
   * Cria uma instância de UsuarioSistema no sistema.
   *
   * O corpo da requisição HTTP deve seguir o seguinte esquema padrão: 
   * {
   *  usuario: 'nome_de_usuario', 
   *  senha: 'senha_do_usuario'
   * }
   *
   * @param {Array} dados Corpo de requisição informações do usuário.
   * @return Cadastro completo do usuário em JSON no esquema [{'usuario', 'senha'}]
   */
  @Post('usuariosSistema/registrar')
  @Bind(
    Body(new UsuarioSistemaValidatorPipe(UsuarioSistemaRegistrarDtoSchema))
  )
  async postRegistrarUsuarioSistema(dados) {
    return this.registraUsuarioSistemaUC.run(dados);
  }

  @Get('usuariosSistema')
  async getUsuariosSistema() {
    return this.consultaTodosUsuariosSistemaUC.run();
  }

  @Put('usuariosSistema/:id')
  @Bind(
    Param('id', ParseIntPipe), 
    Body(new UsuarioSistemaValidatorPipe(UsuarioSistemaRegistrarDtoSchema))
  )
  async putAtualizarUsuarioSistema(id, dados) {
    try {
      this.#logger.log(`[PUT] UsuárioSistema id: ${id}, dados: "${dados}"`);
      return await this.atualizaUsuarioSistemaUC.run(id, dados);
    } catch (error) {
      if (error instanceof UsuarioSistemaInexistenteError) {
        throw new NotFoundException('UsuárioSistema não existe no sistema!', {
          cause: error
        });
      }
      throw error;
    }
  }

  @Get('usuariosSistema/:id')
  @Bind(Param('id', ParseIntPipe))
  async getUsuarioSistemaPorId(id) {
    try {
      this.#logger.log(`[GET] UsuárioSistema id: ${id}`);
      return await this.consultaUsuarioSistemaUC.run(id);
    } catch (error) {
      if (error instanceof UsuarioSistemaInexistenteError) {
        throw new NotFoundException('UsuárioSistema não existe no sistema!', {
          cause: error
        });
      }
      throw error;
    }
  }

  @Delete('usuariosSistema/:id')
  @Bind(Param('id', ParseIntPipe))
  async deleteUsuarioSistemaPorId(id) {
    try {
      this.#logger.log(`[DELETE] UsuárioSistema id: ${id}`);
      return await this.deletaUsuarioSistemaUC.run(id);
    } catch (error) {
      if (error instanceof UsuarioSistemaInexistenteError) {
        throw new NotFoundException('UsuárioSistema não existe no sistema!', {
          cause: error
        });
      }
      throw error;
    }
  }
}

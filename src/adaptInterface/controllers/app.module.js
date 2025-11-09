import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

import { DatabaseModule } from './database.module';

import { Funcionario } from '../persistence/entities/Funcionario.entity';
import { Funcao } from '../persistence/entities/Funcao.entity';
import { Setor } from '../persistence/entities/Setor.entity';
import { Escala } from '../persistence/entities/Escala.entity';
import { UsuarioSistema } from '../persistence/entities/UsuarioSistema.entity';

import { ServicoCadastramento } from '../../domain/services/ServicoCadastramento.service';

import { CadastraFuncionario_UC } from '../../application/CadastraFuncionario';
import { ConsultaTodosFuncionarios_UC } from '../../application/ConsultaTodosFuncionarios';
import { AtualizaFuncionario_UC } from '../../application/AtualizaFuncionario';
import { ConsultaFuncionario_UC } from '../../application/ConsultaFuncionario';
import { DeletaFuncionario_UC } from '../../application/DeletaFuncionario';

import { RegistraEscala_UC } from '../../application/RegistraEscala';
import { ConsultaTodosEscalas_UC } from '../../application/ConsultaTodosEscalas';
import { AtualizaEscala_UC } from '../../application/AtualizaEscala';
import { ConsultaEscala_UC } from '../../application/ConsultaEscala';
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

import { RegistraUsuarioSistema_UC } from '../../application/RegistraUsuarioSistema';
import { ConsultaTodosUsuariosSistema_UC } from '../../application/ConsultaTodosUsuariosSistema';
import { ConsultaUsuarioSistema_UC } from '../../application/ConsultaUsuarioSistema';
import { AtualizaUsuarioSistema_UC } from '../../application/AtualizaUsuarioSistema';
import { DeletaUsuarioSistema_UC } from '../../application/DeletaUsuarioSistema';

// Repositórios ORM
import { FuncionarioORMRepository } from '../persistence/repositories/FuncionarioORM.repository';
import { FuncaoORMRepository } from '../persistence/repositories/FuncaoORM.repository';
import { SetorORMRepository } from '../persistence/repositories/SetorORM.repository';
import { EscalaORMRepository } from '../persistence/repositories/EscalaORM.repository';
import { UsuarioSistemaORMRepository } from '../persistence/repositories/UsuarioSistemaORM.repository';

import { IFuncionarioModelRepository } from '../../domain/repositories/IFuncionarioModel.repository';
import { IFuncaoModelRepository } from '../../domain/repositories/IFuncaoModel.repository';
import { ISetorModelRepository } from '../../domain/repositories/ISetorModel.repository';
import { IEscalaModelRepository } from '../../domain/repositories/IEscalaModel.repository';
import { IUsuarioSistemaModelRepository } from '../../domain/repositories/IUsuarioSistemaModel.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true // uso em serv.
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([
      Funcionario,
      Funcao,
      Setor,
      Escala,
      UsuarioSistema
    ]),
    // HttpModule
  ],
  controllers: [AppController],
  providers: [
    ServicoCadastramento,
    
    // Repositories
    IFuncionarioModelRepository,
    FuncionarioORMRepository,
    IFuncaoModelRepository,
    FuncaoORMRepository,
    ISetorModelRepository,
    SetorORMRepository,
    IEscalaModelRepository,
    EscalaORMRepository,
    IUsuarioSistemaModelRepository,
    UsuarioSistemaORMRepository,

    // Aplication
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
  ],
})
export class AppModule {}

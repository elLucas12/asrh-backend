import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';

import { Funcionario } from '../persistence/entities/Funcionario.entity';
import { Funcao } from '../persistence/entities/Funcao.entity';
import { Setor } from '../persistence/entities/Setor.entity';
import { Escala } from '../persistence/entities/Escala.entity';
import { UsuarioSistema } from '../persistence/entities/UsuarioSistema.entity';

import { ServicoCadastramento } from '../../domain/services/ServicoCadastramento.service';
import { CadastraFuncionario_UC } from '../../application/CadastraFuncionario';
import { RegistraEscala_UC } from '../../application/RegistraEscala';
import { ConsultaTodosFuncionarios_UC } from '../../application/ConsultaTodosFuncionarios';
import { ConsultaTodosEscala_UC } from '../../application/ConsultaTodosEscala';
import { AtualizaFuncionario_UC } from '../../application/AtualizaFuncionario';
import { ConsultaFuncionario_UC } from '../../application/ConsultaFuncionario';
import { ConsultaEscala_UC } from '../../application/ConsultaEscala';
import { AtualizaEscala_UC } from '../../application/AtualizaEscala';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true // uso em serv.
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService) => ({
        type: "mysql",
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_NAME'),
        synchronize: true,
        autoLoadEntities: true,
        logging: true
      }),
      inject: [ConfigService]
    }),
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
    CadastraFuncionario_UC,
    ConsultaTodosFuncionarios_UC,
    AtualizaFuncionario_UC,
    ConsultaFuncionario_UC,
    RegistraEscala_UC,
    ConsultaTodosEscala_UC,
    ConsultaEscala_UC,
    AtualizaEscala_UC
  ],
})
export class AppModule {}

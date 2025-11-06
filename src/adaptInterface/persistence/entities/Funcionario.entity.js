import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Funcao } from './Funcao.entity';

@Entity('Funcionario')
export class Funcionario {
  @PrimaryGeneratedColumn()
  id;
  @Column("varchar")
  nome;
  @Column("varchar")
  cpf;
  @Column("varchar")
  rg;
  @Column("varchar")
  ctps;
  @Column("varchar")
  telefone;
  @Column("varchar")
  email;
  @Column("varchar")
  endereco;
  @ManyToOne(() => Funcao, {eager: true, nullable: false})
  funcao;
  @Column("date")
  dataAdmissao;
  @Column("data")
  dataDemissao;
}
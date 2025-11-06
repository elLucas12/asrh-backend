import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Setor } from './Setor.entity';
import { Escala } from './Escala.entity';

@Entity('Funcao')
export class Funcao {
  @PrimaryGeneratedColumn()
  id;
  @Column("varchar")
  nome;
  @Column("decimal")
  salario;
  @ManyToOne(() => Setor, {eager: true, nullable: false})
  setor;
  @ManyToOne(() => Escala, {eager: true, nullable: false})
  escala;
}
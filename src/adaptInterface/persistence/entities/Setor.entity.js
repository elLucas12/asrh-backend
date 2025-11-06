import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Setor')
export class Setor {
  @PrimaryGeneratedColumn()
  id;
  @Column("varchar")
  nome;
  @Column("varchar")
  descricao;
  @Column("varchar")
  descricaoAtividades;
}
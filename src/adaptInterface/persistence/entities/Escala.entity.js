import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('Escala')
export class Escala {
  @PrimaryGeneratedColumn()
  id;
  @Column("varchar")
  nome;
  @Column("int")
  horasDiarias;
  @Column("int") // limite de 7 dias estabelecido por software
  diasSemana;
}
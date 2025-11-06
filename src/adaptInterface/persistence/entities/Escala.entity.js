import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('Escala')
export class Escala {
  @PrimaryGeneratedColumn()
  id;
  @Column("varchar")
  nome;
  @Column("integer")
  horasDiarias;
  @Column("integer") // limite de 7 dias estabelecido por software
  diasSemana;
}
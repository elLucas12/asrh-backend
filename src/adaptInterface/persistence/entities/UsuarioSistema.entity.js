import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UsuarioSistema')
export class UsuarioSistema {
  @PrimaryGeneratedColumn()
  id;
  @Column("varchar")
  usuario;
  @Column("varchar")
  senha;
}
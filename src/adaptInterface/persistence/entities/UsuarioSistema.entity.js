import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('UsuarioSistema')
export class UsuarioSistema {
  @PrimaryColumn("varchar")
  usuario;
  @Column("varchar")
  senha;
}
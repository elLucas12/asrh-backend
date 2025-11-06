/**
 * Modelo da Entidade 'Funcionario'.
 * 
 * Representa uma instância de funcionário presente no sistema.
 */
export class FuncionarioModel {
  id;
  nome;
  cpf;
  rg;
  ctps;
  telefone;
  email;
  endereco;
  funcao;

  constructor(
    id,
    nome,
    cpf,
    rg,
    ctps,
    telefone,
    email,
    endereco,
    funcao
  ) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.rg = rg;
    this.ctps = ctps;
    this.telefone = telefone;
    this.email = email;
    this.endereco = endereco;
    this.funcao = funcao;
  }
}
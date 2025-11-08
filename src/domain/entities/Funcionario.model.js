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
  dataAdmissao;
  dataDemissao;
  flag;

  constructor(
    id,
    nome,
    cpf,
    rg,
    ctps,
    telefone,
    email,
    endereco,
    funcao,
    dataAdmissao,
    dataDemissao,
    flag
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
    this.dataAdmissao = dataAdmissao;
    this.dataDemissao = dataDemissao;
    this.flag = flag;
  }
}
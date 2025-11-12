import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';

describe('AppController', () => {
  let appController;
  let ids;
  let app;
  jest.setTimeout(30000);

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    appController = app.get(AppController);
    ids = {
      escala: 1,
      setor: 1,
      funcao: 1,
      funcionario: 1
    };
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Lógica Op. cadastrar funcionário', () => {
    const escala = {
      nome: "Escala 5x1 (Gerente)",
      horasDiarias: 8,
      diasSemana: 5
    };
    const setor = {
      nome: "Administração",
      descricao: "Administra a organização",
      descricaoAtividades: "Tarefas administrativas e tomadas de decisões em geral."
    };
    let funcao = {
      nome: "Gerente",
      salario: 10500.58,
      // setor: 1,
      // escala: 1
    };
    let funcionario = {
      nome: "Nicole",
      cpf: "12345678901",
      ctps: "12345/rj",
      rg: "123456789",
      email: "nicole.123@email.com",
      telefone: "21987654321",
      endereco: "Rua das Flores, 123 - Copacabana, RJ",
      // funcao: 1,
      dataAdmissao: "2025-11-09",
      dataDemissao: null,
      flag: 0
    };

    // Registrando as entidades necessárias para criação do funcionário no sistema.
    it('Registrar escala', async() => {
      const resp = await appController.postRegistrarEscala(escala);
      expect(resp.nome).toBe(escala.nome);
      expect(resp.horasDiarias).toBe(escala.horasDiarias);
      expect(resp.diasSemana).toBe(escala.diasSemana);
      ids.escala = resp.id;
    });
    it('Registrar setor', async() => {
      const resp = await appController.postRegistrarSetor(setor);
      expect(resp.nome).toBe(setor.nome);
      expect(resp.descricao).toBe(setor.descricao);
      // expect(resp.descricaoAtividades).toBe(setor.descricaoAtividades);
      ids.setor = resp.id;
    });
    it('Registrar função', async() => {
      funcao.setor = ids.setor;
      funcao.escala = ids.escala;
      const resp = await appController.postRegistrarFuncao(funcao);
      expect(resp.nome).toBe(funcao.nome);
      expect(resp.salario).toBe(funcao.salario);
      expect(resp.setor).toBe(ids.setor);
      expect(resp.escala).toBe(ids.escala);
      ids.funcao = resp.id;
    });
    it('Registrar funcionário', async() => {
      funcionario.funcao = ids.funcao;
      const resp = await appController.postCadastrarFuncionario(funcionario);
      expect(resp.nome).toBe(funcionario.nome);
      expect(resp.cpf).toBe(funcionario.cpf);
      expect(resp.ctps).toBe(funcionario.ctps);
      expect(resp.rg).toBe(funcionario.rg);
      expect(resp.email).toBe(funcionario.email);
      expect(resp.telefone).toBe(funcionario.telefone);
      expect(resp.endereco).toBe(funcionario.endereco);
      expect(resp.funcao).toBe(ids.funcao);
      expect(resp.dataAdmissao).toBe(funcionario.dataAdmissao);
      expect(resp.dataDemissao).toBe(funcionario.dataDemissao);
      expect(resp.flag).toBe(funcionario.flag);
      ids.funcionario = resp.id;
    });

    // Consultando a instância da entidade criada no sistema.
    it('Consultar funcionário', async () => {
      const resp = await appController.getFuncionarioPorId(ids.funcionario);
      expect(resp.nome).toBe(funcionario.nome);
      expect(resp.cpf).toBe(funcionario.cpf);
      expect(resp.ctps).toBe(funcionario.ctps);
      expect(resp.rg).toBe(funcionario.rg);
      expect(resp.email).toBe(funcionario.email);
      expect(resp.telefone).toBe(funcionario.telefone);
      expect(resp.endereco).toBe(funcionario.endereco);
      // expect(resp.funcao).toBe(ids.funcao); // É recebido um dado estruturado!
      expect(new Date(resp.dataAdmissao)).toStrictEqual(new Date(funcionario.dataAdmissao));
      expect(new Date(resp.dataDemissao)).toStrictEqual(new Date(funcionario.dataDemissao));
      expect(resp.flag).toBe(funcionario.flag);
    });
  });
  describe('Deletar Entidades de Teste', () => {
    it('Deletar entidades', async() => {
      await appController.deleteFuncionarioPorId(ids.funcionario);
      await appController.deleteFuncaoPorId(ids.funcao);
      await appController.deleteSetorPorId(ids.setor);
      await appController.deleteEscalaPorId(ids.escala);
    })
  });
});

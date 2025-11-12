import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/adaptInterface/controllers/app.module';

describe('AppController (e2e)', () => {
  let app;
  let ids;
  jest.setTimeout(30000);

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    ids = {
      escala: 1,
      setor: 1,
      funcao: 1,
      funcionario: 1
    };

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  decribe('Registrar funcionário', () => {
    const escala = {
      nome: "Escala 6x1",
      horasDiarias: 8,
      diasSemana: 6
    };
    const setor = {
      nome: "Estoque",
      descricao: "Estoque de produtos",
      descricaoAtividades: "Recebimento, armazenamento e separação de produtos."
    };
    let funcao = {
      nome: "Estoquista",
      salario: 1800.32,
      // setor: 1,
      // escala: 1
    };
    let funcionario = {
      nome: "Ana",
      cpf: "12345678901",
      ctps: "12345/rj",
      rg: "123456789",
      email: "ana.123@email.com",
      telefone: "21987654321",
      endereco: "Rua das Flores, 123 - Copacabana, RJ",
      // funcao: 1,
      dataAdmissao: "2025-11-09 00:00:00",
      dataDemissao: null,
      flag: 0
    };

    it('/escalas/registrar (POST)', async() => {
      const resp = await request(app)
        .post('/escalas/registrar')
        .send(escala)
        .set('Accept', 'application/json');
      expect(resp.statusCode).toBe(201);
      expect(resp.body.nome).toBe(escala.nome);
      expect(resp.body.horasDiarias).toBe(escala.horasDiarias);
      expect(resp.body.diasSemana).toBe(escala.diasSemana);
      expect(resp.headers['content-type']).toMatch(/json/);
      ids.escala = resp.body.id;
    });
    it('/setores/registrar (POST)', async() => {
      const resp = await request(app)
        .post('/setores/registrar')
        .send(setor)
        .set('Accept', 'application/json');
      expect(resp.statusCode).toBe(201);
      expect(resp.body.nome).toBe(setor.nome);
      expect(resp.body.descricao).toBe(setor.descricao);
      // expect(resp.body.descricaoAtividades).toBe(setor.descricaoAtividades);
      expect(resp.headers['content-type']).toMatch(/json/);
      ids.setor = resp.body.id;
    });
    it('/funcoes/registrar (POST)', async() => {
      funcao.setor = ids.setor;
      funcao.escala = ids.escala;
      const resp = await request(app)
        .post('/funcoes/registrar')
        .send(funcao)
        .set('Accept', 'application/json');
      expect(resp.statusCode).toBe(201);
      expect(resp.body.nome).toBe(funcao.nome);
      expect(resp.body.salario).toBe(funcao.salario);
      expect(resp.body.setor).toBe(funcao.setor);
      expect(resp.body.escala).toBe(funcao.escala);
      expect(resp.headers['content-type']).toMatch(/json/);
      ids.funcao = resp.body.id;
    });
    it('/funcionarios/registrar (POST)', async() => {
      funcionario.funcao = ids.funcao;
      const resp = await request(app)
        .post('/funcionarios/registrar')
        .send(funcionario)
        .set('Accept', 'application/json');
      expect(resp.statusCode).toBe(201);
      expect(resp.body.nome).toBe(funcionario.nome);
      expect(resp.body.cpf).toBe(funcionario.cpf);
      expect(resp.body.ctps).toBe(funcionario.ctps);
      expect(resp.body.rg).toBe(funcionario.rg);
      expect(resp.body.email).toBe(funcionario.email);
      expect(resp.body.telefone).toBe(funcionario.telefone);
      expect(resp.body.endereco).toBe(funcionario.endereco);
      expect(resp.body.funcao).toBe(funcionario.funcao);
      expect(resp.body.dataAdmissao).toBe(funcionario.dataAdmissao);
      expect(resp.body.dataDemissao).toBe(funcionario.dataDemissao);
      expect(resp.body.flag).toBe(funcionario.flag);
      expect(resp.headers['content-type']).toMatch(/json/);
      ids.funcionario = resp.body.id;
    });
  });

  describe('Deletar Entidades (com Endpoints)', () => {
    it(`/funcionarios/:${ids.funcionario}`, async() => {
      const resp = await request(app)
        .delete(`/funcionarios/${ids.funcionario}`)
        .set('Accept', 'application/json');
      expect(resp.statusCode).toBe(200);
    });
    it(`/funcoes/:${ids.funcao}`, async() => {
      const resp = await request(app)
        .delete(`/funcoes/${ids.funcao}`)
        .set('Accept', 'application/json');
      expect(resp.statusCode).toBe(200);
    });
    it(`/setores/:${ids.setor}`, async() => {
      const resp = await request(app)
        .delete(`/setores/${ids.setor}`)
        .set('Accept', 'application/json');
      expect(resp.statusCode).toBe(200);
    });
    it(`/escalas/:${ids.escala}`, async() => {
      const resp = await request(app)
        .delete(`/escalas/${ids.escala}`)
        .set('Accept', 'application/json');
      expect(resp.statusCode).toBe(200);
    });
  });

  it('Ret. requisição inválida (400) /funcionarios/registrar (POST)', async() => {
    const funcionarioInvalidoItem = {
      name: "item invalido",
      invalidez: "inválido"
    };

    const resp = await request(app)
      .post('/funcionarios/registrar')
      .send(funcionarioInvalidoItem)
      .set('Accept', 'application/json');
    
    expect(resp.statusCode).toBe(400);
  });
});

import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/adaptInterface/controllers/app.module';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/funcionarios/registrar (POST)', async () => {
    const funcionarioItem = {
      nome: "Ana",
      cpf: "12345678901",
      ctps: "12345/rj",
      rg: "123456789",
      email: "ana.123@email.com",
      telefone: "21987654321",
      endereco: "Rua das Flores, 123 - Copacabana, RJ"
    };

    const resp = await request(app)
      .post('/funcionarios/registrar')
      .send(funcionarioItem)
      .set('Accept', 'application/json');
    
    expect(resp.statusCode).toBe(201);
    expect(resp.body.nome).toBe(funcionarioItem.nome);
    expect(resp.body.cpf).toBe(funcionarioItem.cpf);
    expect(resp.body.ctps).toBe(funcionarioItem.ctps);
    expect(resp.body.rg).toBe(funcionarioItem.rg);
    expect(resp.body.email).toBe(funcionarioItem.email);
    expect(resp.body.telefone).toBe(funcionarioItem.telefone);
    expect(resp.body.endereco).toBe(funcionarioItem.endereco);
    expect(resp.headers['content-type']).toMatch(/json/);
  });

  it('Ret. requisição inválida (400) /funcionarios/registrar (POST)', async () => {
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

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/funcionarios')
  //     .expect(200)
  //     .expect('Hello World!');
  // });
});

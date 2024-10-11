import { configDotenv } from 'dotenv'
import request from 'supertest'
import app from '../src/app'
import UserRepositories from '../src/Repositories/user-repositories'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'

jest.mock('../src/Repositories/user-repositories')

describe('UsuarioController - createUsuario', () => {
    it('deve criar um novo usuário com sucesso', async () => {

    (UserRepositories.prototype.findEmailUser as jest.Mock).mockResolvedValue(null);
  
    (UserRepositories.prototype.createUser as jest.Mock).mockResolvedValue({
        nome: 'João',
        email: 'joao@example.com',
        senha: 'hashed_password',
        telefone: '123456789',
        endereco: 'Rua Exemplo, 123',
        tipo_usuario: 'admin',
        data_criacao: new Date().toISOString(),
        data_aniversario: '1990-01-01',
      });

      const token = sign({ id: 'usuarioId'}, process.env.SECRET_JWT || '', { expiresIn: '20m' })
  
      const response = await request(app)
        .post('/cadastro')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'João',
          email: 'joao@example.com',
          senha: 'senha123',
          telefone: '123456789',
          endereco: 'Rua Exemplo, 123',
          tipo_usuario: 'admin',
          data_aniversario: '1990-01-01',
        });
  
      expect(response.status).toBe(201);
      expect(response.body.message.normalize('NFC')).toBe('Usuário João criado com sucesso'.normalize('NFC'));
    });
  });
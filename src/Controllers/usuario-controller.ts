import { Request, Response } from "express";
import UserRepositories from "../Repositories/user-repositories";
import Usuario from "../models/usuario";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";


export default class UsuarioController {

    async createUsuario (req: Request, res: Response) {
        const { 
            nome, 
            email, 
            senha, 
            telefone, 
            endereco, 
            tipo_usuario, 
            } = req.body

            if(!nome || !email || !senha) {
                return res.status(400).json({
                    message: 'Todos os campos são obrigatórios'
                })
            }

            try {

                const usuarioRepositories = new UserRepositories()
                const emailExist = await usuarioRepositories.findEmailUser(email)

                if(emailExist) {
                    return res.status(409).json({
                        message: 'Email já existente'
                    })
                }

                const usuario = new Usuario({
                    nome,
                    email,
                    senha,
                    telefone,
                    endereco,
                    tipo_usuario
                })

                const hashSenha = await hash(senha, 10)
                usuario.senha = hashSenha

                await usuarioRepositories.createUser(usuario)

                return res.status(201).json({message: `Usuário ${usuario.nome} criado com sucesso`})


            } catch (error) {
                const erro = error as Error
                return res.status(400).json({
                    message: erro.message
                })
            }
    }

    async loginUsuario (req: Request, res: Response) {
        const { email, senha } = req.body

        if(!email || !senha) {
            return res.status(400).json({
                message: 'Todos os campos são obrigatórios'
            })
        }

        try {
            const userRepo = new UserRepositories()

            const user = await userRepo.findUser(email)

            if(!user) {
                return res.status(404).json({
                    message: 'E-mail ou senha inválidos'
                })
            }

            const checkSenha = await compare(senha, user.senha)

            if(!checkSenha) {
                return res.status(400).json({
                    mesage: 'E-mail ou senha inválidos'
                })
            }

            const token = sign({ id: user.id}, process.env.SECRET_JWT || '', {
                expiresIn: '20m'
            })

            return res.json({ token })
            
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({
                message: erro.message
            })
        }

    }

 
}
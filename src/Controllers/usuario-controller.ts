import { Request, Response } from "express";
import UserRepositories from "../Repositories/user-repositories";
import Usuario from "../models/usuario";
import { hash } from "bcrypt";


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

 
}
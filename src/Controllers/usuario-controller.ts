import { Request, Response } from "express";
import UserRepositories from "../Repositories/user-repositories";
import Usuario from "../models/usuario";
import { compare, hash } from "bcrypt";
import { sign, verify, JwtPayload } from "jsonwebtoken";
import { validate as isUUID } from "uuid";

interface TokenPayload extends JwtPayload {
    id: string
}

export default class UsuarioController {

    async createUsuario (req: Request, res: Response) {
        const { 
            nome, 
            email, 
            senha, 
            telefone, 
            endereco, 
            tipo_usuario,
            data_aniversario 
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
                    tipo_usuario,
                    data_criacao: new Date().toISOString(),
                    data_aniversario 
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

    async getUsuario (req: Request, res: Response) { 
        const { id } = req.params

        try {
            const userRepo = new UserRepositories()

            if(id) {
                const usuario = await userRepo.findUserById(id)

                if(!usuario) {
                    return res.status(404).json({
                        message: 'Usuário não encontrado'
                    })
                }

                const { senha, ...usuarioSemSenha } = usuario
                return res.json(usuarioSemSenha)
            }

            const usuarios = await userRepo.findAllUsers()
            const usuariosSemSenha = usuarios.map(({ senha, ...usuarioSemSenha}) => usuarioSemSenha)

            return res.json(usuariosSemSenha)
            
        } catch (error) {
            const erro = error as Error
                return res.status(400).json({
                    message: erro.message
                })
        }
    }

    async updateUsuario(req: Request, res: Response) {
        const token = req.headers.authorization?.split(' ')[1]

        const { id } = req.params
        
        const { 
            nome, 
            email, 
            telefone, 
            tipo_usuario, 
            data_aniversario 
            
        } = req.body


        if(!token) {
            return res.status(401).json({
                message: 'Token inválido ou inexistente'
            })
        }

        try {

            const verificarTokenUser = verify(token, process.env.SECRET_JWT || '') as TokenPayload

            if(!verificarTokenUser.id) {
                return res.status(401).json({
                    message: 'Token inválido'
                })
            }

            if(verificarTokenUser.id !== id) {
                return res.status(401).json({
                    message: 'Você não tem permissão para editar este usuário'
                })
            }

            if(!isUUID(id) ||!nome || !email || !telefone || !tipo_usuario || !data_aniversario) {
                return res.status(400).json({
                    message: 'Todos os campos são obrigatórios'
                })
            }

            const userRepo = new UserRepositories()
 
            const verificarUserId = await userRepo.findUserById(id)

            if(!verificarUserId) {
                return res.status(404).json({
                    message: 'Usuário não encontrado'
                })
            }

            const atualizarDados = await userRepo.editarUsuario(id, {
                nome,
                email,
                telefone,
                tipo_usuario,
                data_aniversario
            })

            if(!atualizarDados) {
                return res.status(404).json({
                    message: 'Não foi possível atualizar o usuário'
                })
            }

            return res.json(atualizarDados)

            
        } catch (error) {
            const erro = error as Error
                return res.status(400).json({
                    message: erro.message
                })
        }

    }

    async deleteUsuario(req: Request, res: Response) { 
        const token = req.headers.authorization?.split(' ')[1]
        const { id } = req.params

        if(!token) {
            return res.status(401).json({
                message: 'Token inválido ou inexistente'
            })
        }

        try {
            const verificarTokenUser = verify(token, process.env.SECRET_JWT || '') as TokenPayload

            if(!verificarTokenUser.id) {
                return res.status(401).json({
                    message: 'Token inválido'
                })
            }

            if(verificarTokenUser.id !== id) {
                return res.status(401).json({
                    message: 'Você não tem permissão para deletar este usuário'
                })
            }

            const userRepo = new UserRepositories()

            const verificarUserId = await userRepo.findUserById(id)

            if(!verificarUserId) {
                return res.status(404).json({
                    message: 'Usuário não encontrado'
                })
            }

            const deletarUsuario = await userRepo.deletarUsuario(id)

            return res.json(deletarUsuario)

            
        } catch (error) {
            const erro = error as Error
                return res.status(400).json({
                    message: erro.message
                })
        }
    }
}
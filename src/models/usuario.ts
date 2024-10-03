import TUsuario from "../types/TUsuario"
import { randomUUID } from "crypto"


export default class Usuario { 
    readonly id?: string
    nome: string
    email: string
    senha: string
    telefone?: string
    endereco?: string
    tipo_usuario: string
    data_criacao?: string
    data_aniversario?: string

    constructor(props: TUsuario) {
        this.id = props.id ?? randomUUID()
        this.nome = props.nome
        this.email = props.email
        this.senha = props.senha
        this.telefone = props.telefone
        this.endereco = props.endereco
        this.data_criacao = props.data_criacao
        this.data_aniversario = props.data_aniversario
        this.tipo_usuario = props.tipo_usuario
    }

    toJSON() {
        const { senha, ...removerSenha } = this
        return removerSenha
    }

    private validateEmail(email: string) {  
        return !! email.toLocaleLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    }
}
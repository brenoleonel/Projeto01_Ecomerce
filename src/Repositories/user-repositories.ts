import pool from "../db/conexaoDb"
import TUsuario from "../types/TUsuario";

export default class UserRepositories {

    async createUser(props: TUsuario) { 
        const query = `insert into usuarios (
        id, 
        nome, 
        email, 
        senha, 
        telefone, 
        endereco, 
        tipo_usuario, 
        data_criacao, 
        data_aniversario) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
        await pool.query(query, 
            [
                props.id, 
                props.nome, 
                props.email, 
                props.senha, 
                props.telefone, 
                props.endereco, 
                props.tipo_usuario, 
                props.data_criacao, 
                props.data_aniversario
            ])
    }

    async findEmailUser(email: string) {
        const query = `select * from usuarios where email = $1`;
        const { rows } = await pool.query(query, [email])
        return rows.length > 0
    }

}
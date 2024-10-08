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

    async findUser(email: string) {
        const query = `select * from usuarios where email = $1`;
        const { rows } = await pool.query(query, [email])
        return rows[0]
    }

    async findUserById(id: string) {
        const query = `select * from usuarios where id = $1`;
        const { rows } = await pool.query(query, [id])
        return rows[0]
    }

    async findAllUsers() {
        const query = `select * from usuarios`;
        const { rows } = await pool.query(query)
        return rows
    }

    async editarUsuario(id: string, props: Omit <TUsuario, "senha">) {
        const query = `update usuarios set nome = $1, email = $2, telefone = $3, tipo_usuario = $4, data_aniversario = $5 where id = $6 returning *`;
        const { rows } = await pool.query(query, [props.nome, props.email, props.telefone, props.tipo_usuario, props.data_aniversario, id])
        return rows[0]
    }

    async deletarUsuario(id: string) {
        const query = `delete from usuarios where id = $1`;
        await pool.query(query, [id])
    }

} 
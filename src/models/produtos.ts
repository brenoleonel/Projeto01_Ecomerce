import TProdutos from "../types/TProdutos"


export default class Produtos {
    id?: number
    nome: string
    descricao?: string
    preco: number
    quantidade_estoque: number
    data_criacao?: string
    data_atualizacao?: string

    constructor(props: TProdutos) {
        this.id = props.id
        this.nome = props.nome
        this.descricao = props.descricao
        this.preco = props.preco
        this.quantidade_estoque = props.quantidade_estoque
        this.data_criacao = props.data_criacao
        this.data_atualizacao = props.data_atualizacao
    }

}
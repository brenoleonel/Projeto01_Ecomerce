type TPedidos = {
    id?: number
    usuario_id: string
    status_pedido: string
    endereco_entrega: string
    total: number
    data_criacao?: string
    data_atualizacao?: string
}

export default TPedidos
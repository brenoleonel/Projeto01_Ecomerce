import { Router } from "express"
import UsuarioController from "../Controllers/usuario-controller"
import authMiddleware from "../Middleware/auth-middleware"

const routes = Router()

routes.post('/cadastro', new UsuarioController().createUsuario)
routes.post('/login', new UsuarioController().loginUsuario)

routes.use(authMiddleware)

routes.get('/usuarios/:id?', new UsuarioController().getUsuario)
routes.put('/usuarios/:id', new UsuarioController().updateUsuario)
routes.delete('/usuarios/:id', new UsuarioController().deleteUsuario)

// routes.get('/produtos/:id?', new ProdutosController().getProdutosById)
// routes.post('/produtos', new ProdutosController().createProdutos)
// routes.put('/produtos/:id', new ProdutosController().updateProdutos)
// routes.delete('/produtos/:id', new ProdutosController().deleteProdutos)

// routes.get('/pedidos/:id'?, new PedidosController().getPedidosById)
// routes.post('/pedidos', new PedidosController().createPedidos)
// routes.put('/pedidos/:id', new PedidosController().updatePedidos)
// routes.delete('/pedidos/:id', new PedidosController().deletePedidos)

// routes.get('/itens-pedido/:id?', new Itens_PedidoController().getItens_PedidoById)
// routes.post('/itens-pedido', new Itens_PedidoController().createItens_Pedido)
// routes.put('/itens-pedido/:id', new Itens_PedidoController().updateItens_Pedido)
// routes.delete('/itens-pedido/:id', new Itens_PedidoController().deleteItens_Pedido)

// routes.get('/pagamentos/:id?', new PagamentosController().getPagamentosById)
// routes.post('/pagamentos', new PagamentosController().createPagamentos)
// routes.put('/pagamentos/:id', new PagamentosController().updatePagamentos)
// routes.delete('/pagamentos/:id', new PagamentosController().deletePagamentos)

// routes.get('/enderecos/:id?', new EnderecosController().getEnderecosById)
// routes.post('/enderecos', new EnderecosController().createEnderecos)
// routes.put('/enderecos/:id', new EnderecosController().updateEnderecos)
// routes.delete('/enderecos/:id', new EnderecosController().deleteEnderecos)

export default routes
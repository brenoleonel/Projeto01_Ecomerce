import { Router } from "express"
import UsuarioController from "../Controllers/usuario-controller"

const routes = Router()

routes.post('/cadastro', new UsuarioController() as any)

export default routes
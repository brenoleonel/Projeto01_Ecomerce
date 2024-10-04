import { Router } from "express"
import UsuarioController from "../Controllers/usuario-controller"

const routes = Router()

routes.post('/cadastro', new UsuarioController().createUsuario)

export default routes
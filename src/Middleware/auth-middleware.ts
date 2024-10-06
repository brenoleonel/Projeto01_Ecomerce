import { NextFunction, Request, Response } from "express";
import { TokenExpiredError, verify } from "jsonwebtoken";


export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({ 
            message: 'Token não informado'
        })  
    }

    const token = authorization.split(' ')[1]

    try {
        verify(token, process.env.SECRET_JWT || '')
        
        next()
        
    } catch (error) {
        if(error instanceof TokenExpiredError) {
            return res.status(403).json({
                message: 'Token expirado'
            })
        }

        return res.status(500).json({
            message: 'Erro interno do servidor'
        })

        }

}
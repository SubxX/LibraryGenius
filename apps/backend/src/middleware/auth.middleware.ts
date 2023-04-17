import { verifyToken } from '../utils/jwt.utils';
import { NextFunction, Request, Response } from 'express';


export const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = (req?.headers?.authorization ?? '') as string
        const jwtToken = token.replace('Bearer ', '')
        if (!jwtToken) throw new Error()
        const user = verifyToken(jwtToken) as Request['user']
        req.user = user
        next()
    } catch (err) {
        res.status(401).json({ status: 401, message: 'Unauthorized' })
    }
}
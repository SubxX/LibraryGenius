import { NextFunction, Request, Response } from 'express';

export const managerMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req?.user
        const isManager = 'isAdmin' in user
        if (!isManager) throw Error()
        next()
    } catch (err) {
        res.status(403).json({ status: 401, message: 'Request initiator is not a manager' })
    }
}

export const userMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req?.user
        const isManager = 'isAdmin' in user
        if (isManager) throw Error()
        next()
    } catch (err) {
        res.status(403).json({ status: 401, message: 'Request initiator is not a user' })
    }
}
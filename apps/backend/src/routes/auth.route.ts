import { Router } from "express";
import { createUser, signinUser, getUser } from "../controllers/auth.controller";
import { authMiddleWare } from "../middleware/auth.middleware";


const router = Router()

router.post('/signup', async (req, res) => {
    try {
        const data = await createUser(req.body)
        res.send(data)
    } catch (err: any) {
        res
            .status(err?.status ?? 500)
            .send({
                status: err?.status ?? 500,
                message: err?.message
            })
    }
});

router.post('/signin', async (req, res) => {
    try {
        const data = await signinUser(req.body)
        res.send(data)
    } catch (err: any) {
        res
            .status(err?.status ?? 500)
            .send({
                status: err?.status ?? 500,
                message: err?.message
            })
    }
});

router.get('/me', authMiddleWare, async (req, res) => {
    try {
        console.log(req?.user)
        const data = await getUser(req?.user?.id)
        res.send(data)
    } catch (err: any) {
        res
            .status(err?.status ?? 500)
            .send({
                status: err?.status ?? 500,
                message: err?.message
            })
    }
});

export default router
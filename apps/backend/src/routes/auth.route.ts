import { Router } from "express";
import { login } from "../controllers/auth.controller";
import { authMiddleWare } from "../middleware/auth.middleware";
import { createUser, getUser } from "../controllers/user.controller";

const router = Router()

// Normal user signup
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

router.post('/login', async (req, res) => {
    try {
        const data = await login(req.body)
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
        const user = req?.user
        const data = await getUser(user.id, 'isAdmin' in user)
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
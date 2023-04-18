import { Router } from "express";

import { authMiddleWare } from "../middleware/auth.middleware";
import { managerMiddleWare } from "../middleware/initiator.middleware";

import { createAuthor, getAuthors } from "../controllers/author.controller";


const router = Router()

router.get('/', async (req, res) => {
    try {
        const data = await getAuthors()
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

router.post('/', authMiddleWare, managerMiddleWare, async (req, res) => {
    try {
        if (!req?.body?.name) throw { status: 400, message: 'Author name is required!' }
        const data = await createAuthor({ created_by: req.user.id, name: req.body.name })
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
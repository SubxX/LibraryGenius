import { Router } from "express";

import { authMiddleWare } from "../middleware/auth.middleware";
import { managerMiddleWare } from "../middleware/initiator.middleware";

import { getAllBooks, createBook, createBookItem } from "../controllers/book.controller";


const router = Router()

router.get('/', async (req, res) => {
    try {
        const data = await getAllBooks()
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
        const payload = { ...(req.body ?? {}), created_by: req.user.id }
        const data = await createBook(payload)
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

router.post('/item', authMiddleWare, managerMiddleWare, async (req, res) => {
    try {
        const payload = { ...(req.body ?? {}), created_by: req.user.id }
        const data = await createBookItem(payload)
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
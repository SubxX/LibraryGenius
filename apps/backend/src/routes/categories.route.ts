import { Router } from "express";

import { authMiddleWare } from "../middleware/auth.middleware";
import { managerMiddleWare } from "../middleware/initiator.middleware";

import { getAllCategories, createCategory } from "../controllers/categories.controller";


const router = Router()

router.get('/', async (req, res) => {
    const data = await getAllCategories()
    res.send(data)
});

router.post('/', authMiddleWare, managerMiddleWare, async (req, res) => {
    try {
        const name = req.body?.name?.toLowerCase()
        if (!name) throw { status: 400, message: 'Please specify name' }

        const data = await createCategory({ created_by: req.user.id, name: req.body?.name })
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
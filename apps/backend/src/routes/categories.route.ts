import { Router } from "express";
import { getAllCategories } from "../controllers/categories.controller";

const router = Router()

router.get('/', async (req, res) => {
    const data = await getAllCategories()
    res.send({ data })
});

router.get('/test', async (req, res) => {
    res.send({ status: true })
});


export default router
import { Router } from "express";
import { getAllCategories } from "../controllers/categories.controller";
import { requireAuthMiddleware } from '../middleware/auth.middleware';

const router = Router()

router.get('/', async (req, res) => {
    res.send(getAllCategories())
});

router.get('/test', requireAuthMiddleware, async (req, res) => {
    res.send({ status: true })
});


export default router
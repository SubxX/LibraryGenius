import { Router } from "express";

import { authMiddleWare } from "../middleware/auth.middleware";
import { createBooking, getUserBookings, getBookingData } from "../controllers/booking.controller";
import { userMiddleWare } from "../middleware/initiator.middleware";


const router = Router()


router.post('/', authMiddleWare, userMiddleWare, async (req, res) => {
    try {
        const payload = { ...(req.body ?? {}), created_by: req.user.id }
        const data = await createBooking(payload)
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

router.get('/', authMiddleWare, userMiddleWare, async (req, res) => {
    try {
        const data = await getUserBookings(req.user.id)
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

router.get('/:id', authMiddleWare, userMiddleWare, async (req, res) => {
    try {
        const payload = {
            id: req.params.id,
            created_by: req.user.id
        }
        const data = await getBookingData(payload)
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
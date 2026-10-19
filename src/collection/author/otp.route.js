
import { Router } from "express";
import {
    sendOtp,
    verifyOtp
} from "./service/otp.service.js";

const router = Router();

router.post("/send-otp", async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const result = await sendOtp(email);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.post("/verify-otp", async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required"
            });
        }

        const result = await verifyOtp(email, otp);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export default router;


import { randomInt } from "node:crypto";
import redis from "../../../lib/db/redais.js";
import { sendEmail } from "../../../lib/db/email/nodemailer.js";

export async function sendOtp(email) {
    const normalizedEmail = email.trim().toLowerCase();
    const otp = randomInt(100000, 1000000).toString();
    const key = `otp:${normalizedEmail}`;

    // Store OTP for 5 minutes
    await redis.set(key, otp, "EX", 300);

    try {
        await sendEmail(
            normalizedEmail,
            "Library - Email Verification",
            `<h2>Your OTP is ${otp}</h2>
             <p>This code expires in 5 minutes.</p>`
        );

        return { message: "OTP sent successfully" };
    } catch (error) {
        await redis.del(key);
        throw error;
    }
}

export async function verifyOtp(email, submittedOtp) {
    const normalizedEmail = email.trim().toLowerCase();
    const key = `otp:${normalizedEmail}`;

    const storedOtp = await redis.get(key);

    if (!storedOtp || storedOtp !== String(submittedOtp).trim()) {
        return {
            success: false,
            message: "Invalid or expired OTP"
        };
    }

    // Delete OTP after successful verification
    await redis.del(key);

    return {
        success: true,
        message: "OTP verified successfully"
    };
}

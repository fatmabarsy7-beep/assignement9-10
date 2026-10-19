
import { OAuth2Client } from "google-auth-library";
import { AppError } from "../error/error.js";

const client = new OAuth2Client({ client_id: '1070893270162-h1dhas4dradct43uojnq3spquai4afsu.apps.googleusercontent.com' });

export async function verifyGoogleToken(idToken) {
    try {
        const ticket = await client.verifyIdToken({
            idToken,
           
        });

        const payload = ticket.getPayload();

        if (!payload?.email || !payload.email_verified) {
            throw new Error("Google email is not verified");
        }

        return payload;
    } catch (err) {
        throw new AppError("Invalid Google token", 403);
    }
}

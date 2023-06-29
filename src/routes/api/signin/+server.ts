import { adminAuth } from "$lib/server/admin";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({request, cookies}) => {
    const { idToken } = await request.json();

    const expiresIn = 60 * 60 * 24 * 7 * 1000;

    const decodedToken = await adminAuth.verifyIdToken(idToken);

    if (new Date().getTime() / 1000 - decodedToken.auth_time < 5 * 60) {
        const cookie = await adminAuth.createSessionCookie(idToken, {expiresIn});
        const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: "/" };

        cookies.set("__session", cookie, options);

        return json({status: "signIn"});
    } else {
        throw error(401, "Recent sign in required!");
    }
}

export const DELETE: RequestHandler = async ({request, cookies}) => {
    cookies.delete('__session', { path: '/' });
    return json({ status: 'signedOut' });
}
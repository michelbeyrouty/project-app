import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/db';
import { comparePasswords, createJWT } from '@/lib/auth';
import { serialize } from "cookie";


type Data = {
    name: string
}

export default async function signin(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method === "POST") {

        const user = await db.user.findUnique({
            where: {
                email: req.body.email,
            },
        });

        if (!user) {
            res.status(401);
            res.json({ error: "Invalid login" } as any);
            return;
        }

        if (! await comparePasswords(req.body.password, user.password)) {
            res.status(401);
            res.json({ error: "Invalid login" } as any);
            return;
        }

        const jwt = await createJWT(user);
        res.setHeader(
            "Set-Cookie",
            serialize(process.env.COOKIE_NAME as string, jwt, {
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            })
        );
        res.status(201);
        res.end();
    } else {
        res.status(404);
        res.end();
    }
}

import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import type { User } from '@prisma/client'
import { db } from "./db";

export function hashPassword(password: string) {
    return bcrypt.hash(password, 10)
}

export function comparePasswords(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
}

export function createJWT(user: User) {
    // return jwt.sign({ id: user.id }, 'cookies')
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 24 * 7;

    return new SignJWT({ id: user.id, email: user.email })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));
}

export async function validateJWT(jwt: string) {
    const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return payload;
}

export async function getUserFromCookie(cookies) {
    const jwt = cookies.get(process.env.COOKIE_NAME);

    const { id } = await validateJWT(jwt.value);

    const user = await db.user.findUnique({
        where: {
            id: id as string,
        },
    });

    return user;
};

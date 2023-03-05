// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient } from "@prisma/client"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const prisma = new PrismaClient();

    try {
        const result = await prisma.user.create({
            data: {
                email: "louis@mail.com",
                name: "Louis"
            },
        });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(403).json({ err: "Error occured while adding a new food." });
    }
}
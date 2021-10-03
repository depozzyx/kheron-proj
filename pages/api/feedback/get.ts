// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { feedbacksJsonPath } from "./_config";

type Data = { author: string; text: string; date: Date }[];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const rawText = await fs.promises.readFile(feedbacksJsonPath, "utf8");
    const parsedText = JSON.parse(rawText);

    res.status(200).json(parsedText);
}

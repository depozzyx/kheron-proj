// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { feedbacksJsonPath } from "./_config";

type RequestData = { author: string; text: string; date: Date };
type ResponseData = { isSuccessful: boolean; error: any };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        const { author, text, date } = req.query;
        if (!author || !text || !date) {
            throw new Error("provide_all_data");
        }
        const newFeedback = {
            author: author,
            text: text,
            date: date,
        };

        const rawText = await fs.promises.readFile(feedbacksJsonPath, "utf8");
        let feedbackList = JSON.parse(rawText);
        feedbackList.push(newFeedback);
        await fs.promises.writeFile(
            feedbacksJsonPath,
            JSON.stringify(feedbackList)
        );

        res.status(200).json({ isSuccessful: true, error: null });
    } catch (error: any) {
        res.status(400).json({ isSuccessful: false, error: error.message });
    }
}

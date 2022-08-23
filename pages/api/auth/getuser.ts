import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db("subscent").collection("users");

    const user = await collection.findOne({ email: req.body.email });

    if (!user) {
        res.status(400).json({ status: 400 });
        return;
    }

    res.status(200).json({ status: 200, user: user });
}
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db("subscent").collection("users");
    const token_collection = client.db("subscent").collection("tokens");

    const user = await collection.findOne({ email: req.body.email });

    if (!user) {
        res.status(400).json({ status: 400 });
        return;
    }

    const valid = await bcrypt.compare(req.body.password, user?.password)

    if (valid) {
        const r = Math.random().toString(36).substring(2, 6) + "-" + Math.random().toString(36).substring(2, 6) + "-" + Math.random().toString(36).substring(2, 6);
        await token_collection.insertOne({ email: req.body.email, token: r });

        res.status(200).json({ status: 200, token: r });

        return;
    }

    res.status(400).json({ status: 400 });
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db("subscent").collection("items");

    res.status(200).json(await collection.find().toArray());
}

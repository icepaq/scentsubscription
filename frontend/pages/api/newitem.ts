import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db("subscent").collection("items");

    const item = {
        name: req.body.item,
        product: req.body.product,
        brand: req.body.brand,
        price: Number.parseInt(req.body.price),
        gender: req.body.gender
    }

    await collection.insertOne(item);

    res.status(200).json({ name: 'John Doe' })
}

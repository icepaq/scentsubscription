import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db("subscent").collection("items");
    const r = await collection.insertOne({
            name: req.body.name,
            brand: req.body.brand,
            gender: req.body.gender,
            amazon: req.body.amazon,
            imgur: req.body.imgur,
            unit_price: Number.parseFloat(req.body.unit_price),
            monthly_price: Number.parseFloat(req.body.monthly_price),
            product: req.body.product,
    });
    
    res.status(200).json(r);
}
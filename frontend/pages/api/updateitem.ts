import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db("subscent").collection("items");

    const item = {
        name: req.body.item,
        brand: req.body.brand,
        gender: req.body.gender,
        amazon: req.body.amazon,
        imgur: req.body.imgur,
        unit_price: req.body.unit_price,
        monthly_price: req.body.monthly_price
    }

    console.log(req.body.id)
    
    const r = await collection.updateOne({_id: new ObjectId(req.body.id)}, {$set: item}, {upsert: true});

    res.status(200).json(r)
}

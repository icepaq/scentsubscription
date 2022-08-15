import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ObjectId } from 'mongodb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db("subscent").collection("items");
    const _id = new ObjectId(req.body.id);
    const r = await collection.findOne({ _id: _id });
    
    res.status(200).json(r);
}
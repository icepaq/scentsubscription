import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db("subscent").collection("orders");
    
    const email = req.body.email;
    const index = req.body.index as number;
    const status = req.body.status;

    const r = await collection.updateOne(
        { email: email },
        { $set: { [`orders.${index}.status`]: status } }
    );
    
    res.status(200).json(r);
}

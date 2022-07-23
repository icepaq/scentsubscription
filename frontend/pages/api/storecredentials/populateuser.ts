import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ObjectId } from 'mongodb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db("subscent").collection("users");
    await collection.insertOne({
        email: req.body.email, 
        time: new Date().getTime(),
        stripe_params: req.body
    });

    res.status(200).json({result: 'success'});
}

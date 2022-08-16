import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db("subscent").collection("users");

    const checkPassword = await collection.findOne({ email: req.body.email });

    if (!checkPassword?.password && checkPassword?.stripe_params?.id == req.body.id) {
        await collection.updateOne({ email: req.body.email }, { $set: {
            password: await bcrypt.hash(req.body.password, saltRounds),
        }});
    }

    res.status(200).json(await collection.find().toArray());
}

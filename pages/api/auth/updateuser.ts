import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db("subscent").collection("users");

    const user = await collection.findOne({ email: req.body.email });
    const stripe = user?.stripe_params;

    if (!stripe) {
        res.status(400).json({ status: 400 });
        return;
    }

    stripe.name = req.body.name;
    stripe.phone = req.body.phone;
    stripe.line1 = req.body.line1;
    stripe.line2 = req.body.line2;
    stripe.city = req.body.city;
    stripe.state = req.body.state;
    stripe.postal_code = req.body.postal_code;
    stripe.country = req.body.country;

    await collection.updateOne({ email: req.body.email }, { $set: { stripe_params: stripe } });

    res.status(200).json({ status: 200, user: user });
}
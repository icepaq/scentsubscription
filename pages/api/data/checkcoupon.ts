import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db("subscent").collection("coupons");

    const r = await collection.findOne({ email: req.body.email, coupon: req.body.coupon });

    if(r) {
        console.log('sdfdsfsdfsdfsdfsdf')
        res.status(200).json({ used: true });
        return;
    }
    console.log('abcdef')

    res.status(200).json({ used: false })
}

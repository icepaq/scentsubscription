import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ObjectId } from 'mongodb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db("subscent").collection("users");

    const customer = await collection.findOne({email: req.body.email as string});

    if (customer) {
        await collection.updateOne({email: req.body.email}, {$set: {
            stripe_params: req.body,
        }});

        if(customer.cancelled) {
            await collection.updateOne({email: req.body.email}, {$set: {
                cancelled: false,
            }});
        }
    } else {
        await collection.insertOne({
            email: req.body.email, 
            time: new Date().getTime(),
            stripe_params: req.body
        });
    }

    await client.close();
    res.status(200).json({result: 'success'});
}

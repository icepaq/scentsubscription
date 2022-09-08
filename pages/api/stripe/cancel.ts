import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt';

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51LO0C6AzWmjsRUNxg2AgvH8jmU8P18XwLWpbGHyCrH8I2U5yOuoNrjSANAxJxQtNp6tvkoZNeb0YBV1nbNUQ2LGa00J5gUzfA8', {apiVersion: '2020-08-27'});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db("subscent").collection("users");

    const user = await collection.findOne({ email: req.body.email });

    if(!user) {
        res.status(400).json({ status: 400 });
        return;
    }

    // const isValid = await bcrypt.compare(req.body.password, user.password);

    // if(!isValid) {
    //     res.status(400).json({ status: 400 });
    //     return;
    // }

    const sub_id = user.stripe_params.subscription;

    const deleted = await stripe.subscriptions.cancel(sub_id);
    console.log(deleted)

    await collection.updateOne({ email: req.body.email }, { $set: { cancelled: true } });

    res.status(200).json(deleted);
}

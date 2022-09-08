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

    const cancelledSubscription = await stripe.subscriptions.retrieve(sub_id);
    const monthlyPrice = cancelledSubscription.items.data[0].price.unit_amount;
    const productID = cancelledSubscription.items.data[0].price.product;

    const priceObject = await stripe.prices.create({
        unit_amount: monthlyPrice as number,
        currency: 'usd',
        product: productID as string,
        recurring: {
            interval: 'month',
            interval_count: 1,
        }
    });

    const checkOutSession = await stripe.checkout.sessions.create({
        success_url: process.env.SITE_URL + '/getstarted/aftercheckout?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: process.env.SITE_URL as string,
        mode: 'subscription',
        line_items: [
            {price: priceObject.id, quantity: 1}
        ],
        shipping_address_collection: {
            allowed_countries: ['US', 'CA']
        },
        customer: user.stripe_params?.customer,
    });

    res.status(200).json({url: checkOutSession.url});
}

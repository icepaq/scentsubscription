import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51LO0C6AzWmjsRUNxg2AgvH8jmU8P18XwLWpbGHyCrH8I2U5yOuoNrjSANAxJxQtNp6tvkoZNeb0YBV1nbNUQ2LGa00J5gUzfA8', {apiVersion: '2020-08-27'});



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const requestOrigin = req.headers.referer;

    if (!requestOrigin?.endsWith('/manage/cancel/2')) {
        res.status(400).json({ message: 'Invalid request' });
        return;
    }

    const { email } = req.body;

    const collection = client.db('subscent').collection('users');
    const couponCollection = client.db('subscent').collection('coupons');

    const couponUse = await couponCollection.findOne({ email: email, coupon: 'cancel' });
    if (couponUse) {
        res.status(400).json({ message: 'Coupon already used' });
        return;
    }

    const user = await collection.findOne({ email: email });

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const userID = user.stripe_params.customer;
    const userSubscriptionPriceID = (await stripe.subscriptions.retrieve(user.stripe_params.subscription)).items.data[0].price.id; 
    const price = (await stripe.prices.retrieve(userSubscriptionPriceID)).unit_amount;
    const adjustment = Math.floor((price as number) * 0.3) * -1;

    await stripe.customers.createBalanceTransaction(
        userID,
        {
            amount: adjustment,
            currency: 'usd',
            description: 'Cancel Discount',
        }
    )

    await couponCollection.insertOne({ coupon: 'cancel', used: true, email: email, date: new Date().getTime() });

    res.status(200).json({ status: 200, user: 'user' });
}

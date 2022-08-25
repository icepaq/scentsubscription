import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ObjectId } from 'mongodb';

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51LO0C6AzWmjsRUNxg2AgvH8jmU8P18XwLWpbGHyCrH8I2U5yOuoNrjSANAxJxQtNp6tvkoZNeb0YBV1nbNUQ2LGa00J5gUzfA8', {apiVersion: '2020-08-27'});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await stripe.checkout.sessions.retrieve(req.body.session_id);

    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
    const cost = subscription.items.data[0].price.unit_amount;

    res.status(200).json({...session, plan: cost}); 
}
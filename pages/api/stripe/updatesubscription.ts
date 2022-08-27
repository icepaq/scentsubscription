import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';
import UpdateProductRecommendations from '../../../scripts/UpdateProductRecommendations';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51LO0C6AzWmjsRUNxg2AgvH8jmU8P18XwLWpbGHyCrH8I2U5yOuoNrjSANAxJxQtNp6tvkoZNeb0YBV1nbNUQ2LGa00J5gUzfA8', {apiVersion: '2020-08-27'});


/**
 * Type - POST
 * Updates a subscription with stripe
 * Param price - the price of the subscription in cents
 * Param email - the email of the customer 
 * returns { status: 200 | 400, message: string}
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db("subscent").collection("users");
    const orderCollection = client.db("subscent").collection("orders");
    const price = req.body.price;
    const email = req.body.email;

    const user = await collection.findOne({ email: email });

    if (!user) {
        res.status(400).json({ status: 400, message: "No User Found" });
        await client.close();
        return;
    }   

    const subID = user?.stripe_params.subscription;

    if(user.stripe_params.plan == price) {
        res.status(200).json({ status: 400, message: "You already have this plan" });
        await client.close();
        return;
    }

    // Create a new price object
    const product = await stripe.products.create({
        name: 'Scent Subs | ' + '$' + (Number.parseInt(price) / 100).toFixed(2),
    }).catch(async (err: any) => {
        await client.close();
        res.status(400).json({ status: 400, message: err });
    });

    const priceObject = await stripe.prices.create({
        unit_amount: price,
        currency: 'usd',
        product: product?.id,
        recurring: {
            interval: 'month',
            interval_count: 1,
        }
    });

    // Update the subscription with Stripe
    const subscription = await stripe.subscriptions.retrieve(subID);
    const newSub = await stripe.subscriptions.update(subID, {
        proration_behavior: 'none',
        items: [
            {
                price: priceObject.id,
                id: subscription.items.data[0].id,
            }
        ]
    });

    // Change plan in user profile
    user.stripe_params.plan = price;
    await collection.updateOne({ email: email }, { $set: { stripe_params: user.stripe_params } });
    const order = await orderCollection.findOne({ email: email });
    const productsFilter = order?.filters.products;
    const genderFilter = order?.filters.gender;

    await client.close();

    // TODO - Fragrance: number is a bad solution and should be changed to pull the cateogry x budget from database
    // Or the GetProductRecommendations function should specify this is only for finding fragrances
    await UpdateProductRecommendations(genderFilter, productsFilter, { Fragrance: Number.parseInt(price) / 100} , email);

    res.status(200).json({ status: 200, message: "Successfully updated plan" });
}
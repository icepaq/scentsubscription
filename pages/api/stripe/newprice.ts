import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ObjectId } from 'mongodb';

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51LO0C6AzWmjsRUNxg2AgvH8jmU8P18XwLWpbGHyCrH8I2U5yOuoNrjSANAxJxQtNp6tvkoZNeb0YBV1nbNUQ2LGa00J5gUzfA8', {apiVersion: '2020-08-27'});

const uri = process.env.MONGO_URI as string;
const client = new MongoClient(uri);


const getCustomer = async (email: string) => {
    await client.connect();
    const collection = client.db("subscent").collection("users");

    const customer = await collection.findOne({email: email}) as any;

    await client.close();
    return customer;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await client.connect();
    const collection = client.db("subscent").collection("items");

    const customerEmail = req.body.customer_email as string;

    let price: number = 0;
    let name: string = "";
    const products: string[] = (req.body.products as string).split(',');

    for(let i = 0; i < products.length; i++) {
        const product = await collection.findOne({_id: new ObjectId(products[i])})
        price += product?.monthly_price;
        name += products[i].substring(16) + "_";
    }

    price = Number.parseInt(price.toFixed(0));

    const product = await stripe.products.create({
        name: 'Scent Subs | ' + '$' + price,
    }).catch((err: any) => {
            res.status(400).json({ error: err });
    });

    const priceObject = await stripe.prices.create({
        unit_amount: price * 100,
        currency: 'usd',
        product: product?.id,
        recurring: {
            interval: 'month',
            interval_count: 1,
        }
    });

    let checkOutSession;
    const customer = await getCustomer(customerEmail);
    console.log(customerEmail)
    console.log(customer)
    if (customer) {
        checkOutSession = await stripe.checkout.sessions.create({
            success_url: 'http://localhost:3000/getstarted/aftercheckout?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000/',
            mode: 'subscription',
            line_items: [
                {price: priceObject.id, quantity: 1}
            ],
            shipping_address_collection: {
                allowed_countries: ['US', 'CA']
            },
            customer: customer.stripe_params?.customer,
        });
    } else {
        checkOutSession = await stripe.checkout.sessions.create({
            success_url: 'http://localhost:3000/getstarted/aftercheckout?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000/',
            mode: 'subscription',
            line_items: [
                {price: priceObject.id, quantity: 1}
            ],
            shipping_address_collection: {
                allowed_countries: ['US', 'CA']
            },
            customer_email: customerEmail,
        });
    }

    res.status(200).json({status: 'success', url: checkOutSession.url});
}

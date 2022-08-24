import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db("subscent").collection("orders");
    
    const rawOrders = JSON.parse(req.body.products);
    const month = new Date().getMonth();
    const date = new Date().getDate();
    let year = new Date().getFullYear();

    const rawFutureOrders = JSON.parse(req.body.futureProducts);

    console.log('------------------------------------------------------');
    console.log(rawFutureOrders)
    const orders = [];
    orders.push({month: month, order: rawOrders});

    let adjustedMonth = month;
    for(let i = 0; i < rawFutureOrders.length; i++) {
        if (adjustedMonth > 11) {
            year++;
            adjustedMonth = adjustedMonth - 11;
        } else {
            adjustedMonth = adjustedMonth + 1;
        }

        orders.push({month: adjustedMonth + 1, date: date, year: year, order: rawFutureOrders[i]});
    }
    

    await collection.insertOne({email: req.body.email, orders: orders});

    res.status(200).json({ message: 'success' })
}

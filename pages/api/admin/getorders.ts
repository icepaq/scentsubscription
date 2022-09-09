import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';
import GetUsers from '../../../scripts/GetUsers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db("subscent").collection("orders");
    const r = await collection.find({}).toArray();

    const orders: any[] = [];
    r.map((user) => {
        user.orders.map((order: any, index: number) => {
            orders.push({
                index: index,
                user: user.email,
                order: order,
            });
        });
    });

    const filtered = orders.filter((a) => {
        const aDate = new Date();
        aDate.setDate(a.order.date);
        aDate.setMonth(a.order.month - 1);
        aDate.setFullYear(a.order.year);

        return aDate.getTime() < (new Date().getTime() + (604800000 * 4)) 
            && aDate.getTime() > new Date().getTime() - (604800000 * 4);
    });

    filtered.sort((a, b) => {
        const aDate = new Date();
        aDate.setDate(a.order.date);
        aDate.setMonth(a.order.month - 1);
        aDate.setFullYear(a.order.year);

        const bDate = new Date();
        bDate.setDate(b.order.date);
        bDate.setMonth(b.order.month - 1);
        bDate.setFullYear(b.order.year);

        return aDate.getTime() - bDate.getTime();
    });

    const users: any = {};
    for (let i = 0; i < filtered.length; i++) {
        const user = await GetUsers(filtered[i].user) as any;
        users[filtered[i].user] = user.stripe_params;
    }

    res.status(200).json({filtered, users});
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';

type RecommendationList = {
    [key: string]: any
}
// Gets items based on user input
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const gender = JSON.parse(req.body.gender);
    const product = JSON.parse(req.body.product);
    const budget = JSON.parse(req.body.budget)

    const collection = client.db("subscent").collection("items");

    const r = collection.find({
        $or: [
            {gender: gender[0]},
            {gender: null},
            {gender: undefined},
            {gender: "null"}
        ],

        product: { $in: product },
    });

    const results = await r.toArray();
    const recommendationList: RecommendationList = {};

    for ( let i = 0; i < results.length; i++ ) {
        
        const product: string = results[i].product;
        if ( results[i].monthly_price <= budget[product] ) {

            if (recommendationList[product] === undefined) {

                if (results[i].monthly_price <= budget[product]) {
                    recommendationList[product] = results[i];
                }
            } else {

                if (results[i].monthly_price <= budget[product] && results[i].monthly_price > recommendationList[product].monthly_price) {
                    recommendationList[product] = results[i];
                }
            }
        }
    }

    res.status(200).json(recommendationList);
}
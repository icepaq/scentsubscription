import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';

// Gets items based on user input
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const gender = JSON.parse(req.body.gender);
    const product = JSON.parse(req.body.product);
    const brand = JSON.parse(req.body.brand);
    const budget = JSON.parse(req.body.budget)

    const collection = client.db("subscent").collection("items");

    let r;

    if (brand[0] === "I am flexible") {
        r = collection.find({
            $or: [
                {gender: gender[0]},
                {gender: null},
                {gender: undefined}
            ],
    
            product: { $in: product },
        });
    
    } else {
        r = collection.find({
            $or: [
                {gender: gender},
                {gender: null},
                {gender: undefined}
            ],
    
            product: { $in: product },
            brand: { $in: brand}
        });
    }

    const results = await r.toArray();  

    for ( let i = 0; i < results.length; i++ ) {
        const product: string = results[i].product;
        if ( results[i].monthly_price > budget[product] ) {
            results.splice(i, 1);
        }
    }


    res.status(200).json(results);
}
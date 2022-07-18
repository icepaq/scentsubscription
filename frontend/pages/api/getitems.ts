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
        if ( results[i].product === "Fragrance" ) {
            if ( results[i].monthly_price > budget['Fragrance'] ) {
                results.splice(i, 1);
            }
        } else if ( results[i].product === "Car Refreshener" ) {
            if ( results[i].monthly_price > budget['Car Refreshener'] ) {
                results.splice(i, 1);
            }
        } else if ( results[i].product === "Air Refreshener" ) {
            if ( results[i].monthly_price > budget['Air Refreshener'] ) {
                results.splice(i, 1);
            }
        } else if ( results[i].product === "Scented Candles" ) {
            if ( results[i].monthly_price > budget['Scented Candles'] ) {
                results.splice(i, 1);
            }
        }
    }


    res.status(200).json(results);
}
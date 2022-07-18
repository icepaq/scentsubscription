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

    const collection = client.db("subscent").collection("items");

    let r;

    console.log(product);
    if (brand[0] === "I am flexible") {
        console.log('sdfsdf')
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
    res.status(200).json(results);
}
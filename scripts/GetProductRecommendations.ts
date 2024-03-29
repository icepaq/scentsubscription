import { MongoClient } from 'mongodb';

type RecommendationList = {
    [key: string]: any
}

export default async function GetProductRecommendations(gender: any, product: any, budget: any) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db("subscent").collection("items");
    const users = client.db("subscent").collection("users");

    const r = collection.find({
        $or: [
            {gender: gender[0]},
            {gender: null},
            {gender: undefined},
            {gender: "null"},
            {gender: ""}
        ],

        product: { $in: product },
    });


    const results = await r.toArray() as any;
    const recommendationList: RecommendationList[] = [{}, {}, {}];    

    for (let a = 0; a < 3; a++) {

        const lengthHolder = results.length;
        for ( let i = 0; i < lengthHolder; i++ ) {

            if (results[i] == null ) {
                continue;
            }

            const product: string = results[i].product;
            if ( results[i].monthly_price <= budget[product] ) {

                if (recommendationList[a][product] === undefined) {

                    if (results[i].monthly_price <= budget[product]) {
                    
                        recommendationList[a][product] = results[i];
                        results[i] = null;

                    }
                } else {
                    if (results[i].monthly_price <= budget[product] && results[i].monthly_price > recommendationList[a][product].monthly_price) {
                        
                        results.push(recommendationList[a][product]);
                        recommendationList[a][product] = results[i];
                        results[i] = null;

                    }
                }
            }
        }
    }

    return recommendationList;
}
import { MongoClient } from 'mongodb';
import GetProductRecommendations from './GetProductRecommendations';

type Item = {
    _id: string,
    name: string,
    product: string,
    monthly_price: number,
    imgur: string,
    status?: string,
}

export default async function UpdateProductRecommendations(gender: any, product: any, budget: any, email: string) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const results = await GetProductRecommendations(gender, product, budget);

    let tempRecommendations = [];
    for (const key in results[0]) {
        const item: Item = {
            _id: results[0][key]._id,
            name: results[0][key].name,
            product: results[0][key].product,
            monthly_price: results[0][key].monthly_price,
            imgur: results[0][key].imgur,
            status: 'Skipped',
        }

        tempRecommendations.push(item);
    }

    const _futureRecommendations: Item[] = [];
    const _futureRecommendationsObject: Item[][] = [];
    for (let i = 1; i < results.length; i++) {
        let tempitem = [];
        for (const key in results[i]) {
            const item: Item = {
                _id: results[i][key]._id,
                name: results[i][key].name,
                product: results[i][key].product,
                monthly_price: results[i][key].monthly_price,
                imgur: results[i][key].imgur,
            }
            tempitem.push(item);
            _futureRecommendations.push(item);

        }
        _futureRecommendationsObject.push(tempitem);
    }

    const month = new Date().getMonth();
    const date = new Date().getDate();
    let year = new Date().getFullYear();

    const orders = [];
    orders.push({month: month + 1, date: date, year: year, order: tempRecommendations});

    let adjustedMonth = month;
    for(let i = 0; i < _futureRecommendationsObject.length; i++) {
        if (adjustedMonth > 11) {
            year++;
            adjustedMonth = adjustedMonth - 11;
        } else {
            adjustedMonth = adjustedMonth + 1;
        }

        orders.push({month: adjustedMonth + 1, date: date, year: year, order: _futureRecommendationsObject[i]});
    }

    const users = client.db("subscent").collection("users");
    const ordersCollection = client.db("subscent").collection("orders");

    const user = await users.findOne({ email: email });

    if (!user) {
        await client.close();
        return;
    }

    await ordersCollection.updateOne({ email: email }, { $set: { orders: orders } });
}
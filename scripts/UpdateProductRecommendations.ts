import { MongoClient } from 'mongodb';
import GetProductRecommendations from './GetProductRecommendations';

export default async function UpdateProductRecommendations(gender: any, product: any, budget: any, email: string) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const recommendations = await GetProductRecommendations(gender, product, budget);

    const users = client.db("subscent").collection("users");
    const orders = client.db("subscent").collection("orders");

    const user = await users.findOne({ email: email });

    if (!user) {
        await client.close();
        return;
    }

    await orders.updateOne({ email: email }, { $set: { orders: recommendations } });
}
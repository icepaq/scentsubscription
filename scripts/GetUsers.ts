import { MongoClient } from 'mongodb';

export default async function GetUsers(email: string) {

    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db("subscent").collection("users");

    return await collection.findOne({ email: email });
}
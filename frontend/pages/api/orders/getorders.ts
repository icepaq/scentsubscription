import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';


type OrderEntry = {
    _id: string,
    name: string,
    product: string,
    monthly_price: number,
    imgur: string,
}

type OrderType = {
    month: number,
    order: OrderEntry[]
}

type CategoriesList = {
    [key: number]: string[]
}

const isInArray = (arr: any[], val: any) => {
    return arr.indexOf(val) > -1;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db("subscent").collection("orders");

    const r = await collection.findOne({ email: req.body.email }) as any;

    let categories: CategoriesList = {};

    r.orders.map((order: OrderType) => {
        order.order.map((item: any) => {
            if (categories[order.month]) {
                if (!isInArray(categories[order.month], item.product)) {
                    categories[order.month].push(item.product);
                }
            } else {
                categories[order.month] = [];
                categories[order.month].push(item.product);
            }
        });
    })

    const CURRENT_MONTH = new Date().getMonth();

    const result = {
        current_month: CURRENT_MONTH,
        categories: categories,
        orders: r.orders
    }

    await client.close();

    res.status(200).json(result);
}

/**
 * Example response
 * {
  "current_month": 7,
  "categories": {
    "6": [
      "Car Refreshener",
      "Fragrance"
    ],
    "7": [
      "Fragrance",
      "Car Refreshener"
    ],
    "8": [
      "Fragrance",
      "Car Refreshener"
    ]
  },
  "orders": [
    {
      "month": 6,
      "order": [
        {
          "_id": "62e6e7e756ee412ad7015f39",
          "name": "Little Trees Ultra Premium",
          "product": "Car Refreshener",
          "monthly_price": 7,
          "imgur": "https://i.imgur.com/fMDyXBz.jpeg"
        },
        {
          "_id": "62dd722e2b77d44498bfbb83",
          "name": "Dior Sauvage",
          "product": "Fragrance",
          "monthly_price": 28.99,
          "imgur": "https://i.imgur.com/FLnZjjL.jpeg"
        }
      ]
    },
    {
      "month": 7,
      "order": [
        {
          "_id": "62e6d00a56ee412ad7015f25",
          "name": "Dior Sauvage Cheap",
          "product": "Fragrance",
          "monthly_price": 25.99,
          "imgur": "https://i.imgur.com/FLnZjjL.jpeg"
        },
        {
          "_id": "62e6d71656ee412ad7015f2c",
          "name": "Little Trees Premium",
          "product": "Car Refreshener",
          "monthly_price": 5,
          "imgur": "https://i.imgur.com/fMDyXBz.jpeg"
        }
      ]
    },
    {
      "month": 8,
      "order": [
        {
          "_id": "62c5ef243c8adb002a3de0dc",
          "name": "Drakensberg Rollerball Cologne",
          "product": "Fragrance",
          "monthly_price": 12.99,
          "imgur": "https://i.imgur.com/FLnZjjL.jpeg"
        },
        {
          "_id": "62c5e74d3c8adb002a3de0d7",
          "name": "Little Trees",
          "product": "Car Refreshener",
          "monthly_price": 2,
          "imgur": "https://i.imgur.com/fMDyXBz.jpeg"
        }
      ]
    }
  ]
}
 */
import type { NextApiRequest, NextApiResponse } from 'next'
import GetProductRecommendations from '../../scripts/GetProductRecommendations';

// Algorithm matches user filters against products and recommends products for the next  three months
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const gender = JSON.parse(req.body.gender);
    const product = JSON.parse(req.body.product);
    const budget = JSON.parse(req.body.budget)

    const recommendationList = await GetProductRecommendations(gender, product, budget);

    res.status(200).json(recommendationList);
}

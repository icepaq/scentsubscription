import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import styles from '../../styles/Final.module.css'

type Item = {
    title: string,
    gneder: string,
    name: string,
    product: string,
    unit_price: number,
    monthly_cost: number,
}

type RecommendationsList = {
    Fragrance?: Item,
    Car_Refreshener?: Item,
    Air_Refreshener?: Item,
    Scented_Candle?: Item,
}

const Final = () => {

    const [recommendations, setRecommendations] = useState<RecommendationsList>();
    useEffect(() => {
        async function processRecommendations(_params: URLSearchParams) {

            const results = await fetch('/api/getitems', {method: 'POST', body: _params}).then(res => res.json());
            
            console.log(results);
        }

        const genderFilter = Cookies.get('GENDER');
        const productFilter = Cookies.get('PRODUCTS');
        const brandFilter = Cookies.get('BRANDS');
        const budgetFilter = Cookies.get('BUDGET');

        console.log(productFilter)

        const params = new URLSearchParams();
        params.append('product', productFilter as string);
        params.append('brand', brandFilter as string);
        params.append('gender', genderFilter as string);
        params.append('budget', budgetFilter as string);

        processRecommendations(params);

    }, [])

    return (
        <>
            <div className={styles.container}>
                <div className={styles.title}>
                    Here are your suggestions
                </div>
                <div className={styles.checkout}>
                    Checkout
                </div>
                <div className={styles.items}>

                </div>
            </div>
        </>
    )
}

export default Final
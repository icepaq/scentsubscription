import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import styles from '../../styles/Final.module.css'

type Item = {
    name: string,
    product: string,
    monthly_price: number,
}
const Final = () => {

    const [recommendations, setRecommendations] = useState<Item[]>([]);
    useEffect(() => {
        async function processRecommendations(_params: URLSearchParams) {

            const results = await fetch('/api/getitems', {method: 'POST', body: _params}).then(res => res.json());
            
            let tempRecommendations: Item[] = [];
            for (const key in results) {

                const item: Item = {
                    name: results[key].name,
                    product: results[key].product,
                    monthly_price: results[key].monthly_price,
                }

                tempRecommendations.push(item);
            }

            setRecommendations(tempRecommendations);
        }

        const genderFilter = Cookies.get('GENDER');
        const productFilter = Cookies.get('PRODUCTS');
        const budgetFilter = Cookies.get('BUDGET');

        console.log(productFilter)

        const params = new URLSearchParams();
        params.append('product', productFilter as string);
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
                    {
                        recommendations.map((item: Item) => {
                            return (
                                <div className={styles.item}>
                                    <div className={styles.itemTitle}>{item.name}</div>
                                    <div className={styles.itemPrice}>{'$' + item.monthly_price + ' / month'}</div>
                                    <div className={styles.itemImage}></div>
                                    <div className={styles.itemCategory}>{item.product}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Final
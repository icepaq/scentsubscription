import { useEffect, useState } from 'react'
import styles from '../../styles/GetStarted.module.css'
import Cookies from 'js-cookie'
import CategoryPriceSlider from './CategoryPriceSlider'

const BudgetSelector = () => {

    const [categories, setCategories] = useState<string[]>([]);
    useEffect(() => {
        const categories = Cookies.get('PRODUCTS');

        if (!categories) return;
        setCategories(JSON.parse(categories));

    }, [])
    return (
        <>
            <div className={styles.formSlider}>
                <div className={styles.step}>
                    {'Step 4 of 4'}
                </div>
                <div className={styles.stepQuestion}>
                    {'What is your budget'}
                </div>
                <div className={styles.sliders}>

                    {
                        categories.map((title: any) => {
                            return <CategoryPriceSlider title={title} range={50}/>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default BudgetSelector
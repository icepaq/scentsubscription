import { useEffect, useState } from 'react'
import styles from '../../styles/GetStarted.module.css'
import Cookies from 'js-cookie'
import CategoryPriceSlider from './CategoryPriceSlider'

const BudgetSelector = () => {

    const [categories, setCategories] = useState<string[]>([]);
    const [budgets, setBudgets] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const categories = Cookies.get('PRODUCTS');

        if (!categories) return;
        setCategories(JSON.parse(categories));

    }, [])

    const updateBudget = (category: string, price: number) => {
        const _budgets = { ...budgets };
        _budgets[category] = price;
        setBudgets(_budgets);

        Cookies.set('BUDGET', JSON.stringify(_budgets));
    }

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
                            return <CategoryPriceSlider title={title} range={'50'} updateBudget={updateBudget} key={'key_' + title}/>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default BudgetSelector
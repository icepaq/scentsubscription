import styles from '../../styles/GetStarted.module.css'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

type CategoryPriceSliderProps = {
    title: string,
    range: string,
    updateBudget: (category: string, price: number) => void
}

const CategoryPriceSlider = ({title, range, updateBudget}: CategoryPriceSliderProps) => {

    const [value, setValue] = useState('0');

    const handleChange = (event: any) => {
        setValue(event.target.value);
        updateBudget(title, parseInt(event.target.value));
    }

    return (
        <>
            <div className={styles.inputRangeContainer}>
                <div className={styles.inputRangeTitle}>
                    {title}
                </div>
                <div className={styles.inputRangeTextContainer}>
                    <input className={styles.inputRangeText} type="text" value={value} onChange={handleChange} />
                </div>
                <input className={styles.inputRange} type="range" min="2" max="30" value={value} onChange={handleChange}/>            
            </div>
        </>
    )
}

export default CategoryPriceSlider
import styles from '../../styles/GetStarted.module.css'
import { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'

type CategoryPriceSliderProps = {
    title: string,
    range: string,
    updateBudget: (category: string, price: number) => void
}

const CategoryPriceSlider = ({title, range, updateBudget}: CategoryPriceSliderProps) => {

    const [value, setValue] = useState('10');

    useEffect(() => {
        if (title === 'Fragrance') { setValue('10') }
        if (title === 'Car Refreshener') { setValue('2') }
        if (title === 'Scented Candles') { setValue('15') }
    }, [])
    const handleChange = (event: any) => {
        const price = parseInt(event.target.value);
        if (title === 'Fragrance') { if (price < 8) return }
        if (title === 'Car Refreshener') { if (price < 2) return }
        if (title === 'Scented Candles') { if (price < 5) return }
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
import styles from '../../styles/GetStarted.module.css'
import { useEffect, useState } from 'react'
const CategoryPriceSlider = ({title, range}: any) => {

    const [value, setValue] = useState('0');
    return (
        <>
            <div className={styles.inputRangeContainer}>
                <div className={styles.inputRangeTitle}>
                    {title}
                </div>
                <div className={styles.inputRangeTextContainer}>
                    <input className={styles.inputRangeText} type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                </div>
                <input className={styles.inputRange} type="range" min="2" max="30" value={value} onChange={(e) => {setValue(e.target.value)}}/>            
            </div>
        </>
    )
}

export default CategoryPriceSlider
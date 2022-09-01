import Image from 'next/image';
import styles from '../../../styles/Cancel.module.css';

const Cancel = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.title}>
                        Before you go
                    </div>
                    <div className={styles.text}>
                        We would like to offer you 30% off your next month and will throw in a random fragrance fo free. This coupon will be automatically added to your profile.                    </div>
                    <div className={styles.coupon}>
                        <span className={styles.left}>
                            <Image src={'/squaredior.png'} height={150} width={150}/> 
                        </span>
                        <span className={styles.right}>
                            <div className={styles.top}>
                                <div className={styles.textWrap}>
                                    <span className={styles.bold}>30% Off</span>
                                    <span className={styles.light}> your next order</span>                                    
                                </div>
                            </div>
                            <div className={styles.bottom}>
                                <div className={styles.textWrap}>
                                    <span className={styles.bold}>+ FREE</span>
                                    <span className={styles.light}> random fragrance</span>      
                                </div>
                            </div>
                        </span>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.button}>No thank you, cancel</div>
                        <div className={styles.button}>Yes please!</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cancel;
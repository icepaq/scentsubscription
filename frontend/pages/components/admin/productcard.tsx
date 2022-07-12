import styles from '../../../styles/ProductAdmin.module.css'
import Image from 'next/image'

const ProductCard = ({ product }: any) => {
    return (
        <div className={styles.productCard}>
            <div className={styles.productCardImageWrapper}>
                <Image className={styles.productCardImage} src={'/diorsauvage.jpg'} width={70} height={160} />
            </div>
            <div className={styles.productCardInfo}>
                <div className={styles.productCardInfoRow}>
                    <div className={styles.productCardInfoBox}>
                        <div className={styles.productCardInfoBoxTitle}>Brand</div>
                        <div className={styles.productCardInfoBoxText}>Dior</div>
                    </div>
                    <div className={styles.productCardInfoBox}>
                        <div className={styles.productCardInfoBoxTitle}>Product name</div>
                        <div className={styles.productCardInfoBoxText}>Dior Sauvage</div>
                    </div>
                    <div className={styles.productCardInfoBox}>
                        <div className={styles.productCardInfoBoxTitle}>Product ID</div>
                        <div className={styles.productCardInfoBoxText}>3de0d6</div>
                    </div>
                </div>
                <div className={styles.productCardInfoRow}>
                    <div className={styles.productCardInfoBox}>
                        <div className={styles.productCardInfoBoxTitle}>Gender</div>
                        <div className={styles.productCardInfoBoxText}>Male</div>
                    </div>
                    <div className={styles.productCardInfoBox}>
                        <div className={styles.productCardInfoBoxTitle}>Price / Month</div>
                        <div className={styles.productCardInfoBoxText}>$12.00</div>
                    </div>
                    <div className={styles.productCardInfoBox}>
                        <div className={styles.productCardInfoBoxTitle}>Unit Price</div>
                        <div className={styles.productCardInfoBoxText}>$165.00</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
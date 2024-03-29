import styles from '../../../styles/ProductAdmin.module.css'
import NextImage from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const ProductCard = ({ product }: any) => {

    return (
        <Link href={`/admin/product/${product?._id || 'error'}`}>
        <div className={styles.productCard}>
            <div className={styles.productCardImageWrapper}>
                <NextImage className={styles.productCardImage} src={product?.imgur || '/diorsauvage.jpg'} width={70} height={160} />
            </div>
            <div className={styles.productCardInfo}>
                <div className={styles.productCardInfoRow}>
                    <div className={styles.productCardInfoBox}>
                        <div className={styles.productCardInfoBoxTitle}>Brand</div>
                        <div className={styles.productCardInfoBoxText}>{product?.brand}</div>
                    </div>
                    <div className={styles.productCardInfoBox}>
                        <div className={styles.productCardInfoBoxTitle}>Product name</div>
                        <div className={styles.productCardInfoBoxText}>{product?.name}</div>
                    </div>
                    <div className={styles.productCardInfoBox}>
                        <div className={styles.productCardInfoBoxTitle}>Product ID</div>
                        <div className={styles.productCardInfoBoxText}>{product?._id}</div>
                    </div>
                </div>
                <div className={styles.productCardInfoRow}>
                    <div className={styles.productCardInfoBox}>
                        <div className={styles.productCardInfoBoxTitle}>Gender</div>
                        <div className={styles.productCardInfoBoxText}>{product?.male}</div>
                    </div>
                    <div className={styles.productCardInfoBox}>
                        <div className={styles.productCardInfoBoxTitle}>Price / Month</div>
                        <div className={styles.productCardInfoBoxText}>{product?.monthly_price}</div>
                    </div>
                    <div className={styles.productCardInfoBox}>
                        <div className={styles.productCardInfoBoxTitle}>Unit Price</div>
                        <div className={styles.productCardInfoBoxText}>{product?.unit_price}</div>
                    </div>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default ProductCard

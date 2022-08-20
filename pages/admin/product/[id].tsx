import nodefetch from 'node-fetch'
import { useState } from 'react'
import styles from '../../../styles/Edit.module.css'
import { useRouter } from 'next/router'

const Product = ({ product }: any) => {

    const [brand, setBrand] = useState(product.brand)
    const [gender, setGender] = useState(product.gender)
    const [imgur, setImgur] = useState(product.imgur)
    const [amazon, setAmazon] = useState(product.amazon)
    const [product_name, setName] = useState(product.name)
    const [unit_price, setUnitCost] = useState(product.unit_price)
    const [monthly_price, setMonthlyPrice] = useState(product.monthly_price)

    const router = useRouter()

    const updateInformation = () => {
        const params = new URLSearchParams();
        params.append('brand', brand);
        params.append('gender', gender);
        params.append('imgur', imgur);
        params.append('amazon', amazon);
        params.append('item', product_name);
        params.append('unit_price', unit_price);
        params.append('monthly_price', monthly_price);
        params.append('id', product._id);

        fetch('/api/updateitem', {method: 'POST', body: params});
        router.push('/admin/products')
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>Edit Product</div>
            <div className={styles.productTitle}>Dior Sauvage</div>
            <div className={styles.productID}>{product._id}</div>

            <div className={styles.button} onClick={updateInformation}>
                Update Information
            </div>
            <div className={styles.productInfo}>
                <span className={styles.form}>
                    <div className={styles.formTitle}>Brand</div>
                    <input className={styles.formInput} type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />

                    <div className={styles.formTitle}>Product Name</div>
                    <input className={styles.formInput} type="text" value={product_name} onChange={(e) => setName(e.target.value)} />

                    <div className={styles.formTitle}>Gender</div>
                    <input className={styles.formInput} type="text" value={gender} onChange={(e) => setGender(e.target.value)} />

                    <div className={styles.formTitle}>Unit Cost</div>
                    <input className={styles.formInput} type="text" value={unit_price} onChange={(e) => setUnitCost(e.target.value)} />

                    <div className={styles.formTitle}>Price / Month</div>
                    <input className={styles.formInput} type="text" value={monthly_price} onChange={(e) => setMonthlyPrice(e.target.value)} />
                </span>
                <span className={styles.form}>
                    <div className={styles.formTitle}>Amazon Link</div>
                    <input className={styles.formInput} type="text" value={amazon} onChange={(e) => setAmazon(e.target.value)} />

                    <div className={styles.formTitle}>Imgur Link</div>
                    <input className={styles.formInput} type="text" value={imgur} onChange={(e) => setImgur(e.target.value)} />
                </span>
            </div>
        </div>
    )
}

export async function getServerSideProps(context: any) {
    const { id } = context.query
    const params = new URLSearchParams();
    params.append('id', id);

    const product = await nodefetch(process.env.SITE_URL + `/api/getsingleitem/`, { method: 'POST', body: params }).then(res => res.json());
    return {
        props: {
            product
        }
    }
}

export default Product

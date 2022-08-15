import nodefetch from 'node-fetch'
import { useState } from 'react'
import styles from '../../styles/Edit.module.css'
import { useRouter } from 'next/router'

const Product = () => {

    const [brand, setBrand] = useState('')
    const [gender, setGender] = useState('')
    const [imgur, setImgur] = useState('')
    const [amazon, setAmazon] = useState('')
    const [product_name, setName] = useState('')
    const [unit_cost, setUnitCost] = useState('')
    const [monthly_price, setMonthlyPrice] = useState('')
    const [product_category, setCategory] = useState('')

    const router = useRouter()

    const updateInformation = async () => {
        const params = new URLSearchParams();
        params.append('brand', brand);
        params.append('gender', gender);
        params.append('imgur', imgur);
        params.append('amazon', amazon);
        params.append('name', product_name);
        params.append('unit_price', unit_cost);
        params.append('monthly_price',  monthly_price);
        params.append('product', product_category);

        await fetch('http://localhost:3000/api/admin/newproduct', {method: 'POST', body: params});
        router.push('/admin/products')
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>Edit Product</div>
            <div className={styles.productTitle}></div>

            <div className={styles.button} onClick={updateInformation}>
                Create Product
            </div>
            <div className={styles.productInfo}>
                <span className={styles.form}>
                    <div className={styles.formTitle}>Brand</div>
                    <input className={styles.formInput} type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />

                    <div className={styles.formTitle}>Product Name</div>
                    <input className={styles.formInput} type="text" value={product_name} onChange={(e) => setName(e.target.value)} />
                    
                    <div className={styles.formTitle}>Product Category</div>
                    <input className={styles.formInput} type="text" value={product_category} onChange={(e) => setCategory(e.target.value)} />

                    <div className={styles.formTitle}>Gender</div>
                    <input className={styles.formInput} type="text" value={gender} onChange={(e) => setGender(e.target.value)} />

                    <div className={styles.formTitle}>Unit Cost</div>
                    <input className={styles.formInput} type="text" value={unit_cost} onChange={(e) => setUnitCost(e.target.value)} />

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

export default Product

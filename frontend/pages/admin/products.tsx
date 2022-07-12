import Header from '../components/header'
import ProductCard from '../components/admin/productcard'
import styles from '../../styles/ProductAdmin.module.css'

const Products = () => {
    return (
        <>
            <Header />
            <div className={styles.wrapper}>
                <h1>Product Management</h1>

                <div className={styles.inputWrapper}>
                    <input className={styles.input} type="text" placeholder="Search by Name, Brand, Property or ID" />
                </div>
                <ProductCard />
                <ProductCard />
                <ProductCard />

            </div>
        </>
    )
}

export default Products
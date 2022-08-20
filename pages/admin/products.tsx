import Header from '../components/header'
import ProductCard from '../components/admin/productcard'
import styles from '../../styles/ProductAdmin.module.css'
import fetch from 'node-fetch'

const Products = ({products}: any) => {
    return (
        <>
            <Header />
            <div className={styles.wrapper}>
                <h1>Product Management</h1>

                <div className={styles.inputWrapper}>
                    <input className={styles.input} type="text" placeholder="Search by Name, Brand, Property or ID" />
                </div>

                {products.map((product: any) => {
                    return <ProductCard product={product} key={'key_'}/>
                })}

            </div>
        </>
    )
}

export async function getServerSideProps(context: any) {
    const products = await fetch(process.env.SITE_URL + '/api/getallitems').then(res => res.json());

    return {
        props: {
            products
        }
    }
}

export default Products
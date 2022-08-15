import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import styles from '../styles/Form.module.css'
import Header from './components/header'

const Home: NextPage = () => {
    const ITEM = useRef<string>();
    const PRODUCT = useRef<string>();
    const BRAND = useRef<string>();
    const PRICE = useRef<string>();
    const GENDER = useRef<string>();
    const AMAZON = useRef<string>();
    const IMAGE_1 = useRef<string>();

    const router = useRouter();

    const submit = async () => {
        const params = new URLSearchParams();
        params.append('item', ITEM.current as string);
        params.append('product', PRODUCT.current as string);
        params.append('brand', BRAND.current as string);
        params.append('price', PRICE.current as string);
        params.append('gender', GENDER.current as string);
        params.append('amazon', AMAZON.current as string);
        params.append('image1', IMAGE_1.current as string);

        const r = await fetch('/api/newitem', {method: 'POST', body: params});

        if(r.ok) router.reload();
    }

    return (
        <>
            <Header />
            <div className={styles.container}>
                <input className={styles.input} type='text' placeholder='Item' onChange={(e) => {ITEM.current = e.target.value}} /> <br />
                <input className={styles.input} type='text' placeholder='Product' onChange={(e) => {PRODUCT.current = e.target.value}} /> <br />
                <input className={styles.input} type='text' placeholder='Brand' onChange={(e) => {BRAND.current = e.target.value}} /> <br />
                <input className={styles.input} type='text' placeholder='Price' onChange={(e) => {PRICE.current = e.target.value}} /> <br />
                <input className={styles.input} type='text' placeholder='Gender' onChange={(e) => {GENDER.current = e.target.value}} /> <br />
                <input className={styles.input} type='text' placeholder='Amazon Link' onChange={(e) => {AMAZON.current = e.target.value}} /> <br />
                <input className={styles.input} type='text' placeholder='Image Link 1' onChange={(e) => {IMAGE_1.current = e.target.value}} /> <br />

                <div className={styles.button} onClick={submit}>
                    Add Item
                </div>
            </div>
        </>
    )
}

export default Home

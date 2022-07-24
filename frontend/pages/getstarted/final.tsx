import Cookies from "js-cookie"
import { useEffect, useRef, useState } from "react"
import styles from '../../styles/Final.module.css'
import { useRouter } from 'next/router'
import Image from "next/image"
import Swal from 'sweetalert2'
import WhiteAndSpinner from '../components/loader/spinner_white'

type Item = {
    _id: string,
    name: string,
    product: string,
    monthly_price: number,
    imgur: string,
}

const Final = () => {

    const [recommendations, setRecommendations] = useState<Item[]>([]);

    const products = useRef<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        async function processRecommendations(_params: URLSearchParams) {

            const results = await fetch('/api/getitems', {method: 'POST', body: _params}).then(res => res.json());

            let tempRecommendations: Item[] = [];
            for (const key in results) {

                const item: Item = {
                    _id: results[key]._id,
                    name: results[key].name,
                    product: results[key].product,
                    monthly_price: results[key].monthly_price,
                    imgur: results[key].imgur,
                }

                tempRecommendations.push(item);
            }
            
            setRecommendations(tempRecommendations);
        }

        const genderFilter = Cookies.get('GENDER');
        const productFilter = Cookies.get('PRODUCTS');
        const budgetFilter = Cookies.get('BUDGET');

        const params = new URLSearchParams();
        params.append('product', productFilter as string);
        params.append('gender', genderFilter as string);
        params.append('budget', budgetFilter as string);

        processRecommendations(params);

    }, [])

    const showSpinner = () => {
        const spinner = document.getElementById('spinner') as HTMLElement;
        spinner.style.display = 'block';
    }

    const fadeWhiteIn = async() => {
        const doc = document.getElementById('white_background');

        for(let i = 0; i <= 50; i++) {
            await new Promise(r => setTimeout(r, 16));
            doc?.setAttribute('style', 'display: block; background-color: rgba(255, 255, 255, ' + ((i*2) / 100) + ')');
        }
    }

    const fadeOutSpinner = async() => {
        const spinner = document.getElementById('spinner') as HTMLElement;
        for(let i = 25; i >= 0; i--) {
            await new Promise(r => setTimeout(r, 16));
            spinner?.setAttribute('style', 'display: block; opacity: ' + ((i * 4) / 100));
        }
    }

    const checkout = async () => {
        let customerEmail: string | undefined = undefined;

        await Swal.fire({
            title: 'Please enter your email to continue',
            input: 'email',
            inputPlaceholder: 'anton@scentsubs.com',
        }).then((result: any) => {
            if (result.value) {
                customerEmail = result.value;
                
                const params = new URLSearchParams();
                params.append('email', result.value);
                fetch('/api/storecredentials/createemail', {method: 'POST', body: params});

                showSpinner();
                fadeWhiteIn();
            }
        });



        if (customerEmail) {
            const params = new URLSearchParams();
            params.append('products', products.current.join(','));
            params.append('customer_email', customerEmail);
            await fetch('/api/stripe/newprice', {method: 'POST', body: params})
                .then(res => res.json())
                .then(async (res: any) => {
                    await fadeOutSpinner();
                    router.push(res.url);
                })
        }
    }

    return (
        <>
            <WhiteAndSpinner />
            <div className={styles.container}>
                <div className={styles.title}>
                    Here are your suggestions
                </div>
                <div className={styles.checkout} onClick={checkout}>
                    Checkout
                </div>
                <div className={styles.items}>
                    {
                        recommendations.map((item: Item) => {

                            if(products.current.length < recommendations.length) {
                                products.current.push(item._id);
                            }
                            
                            return (
                                <div className={styles.item} key={'PRODUCTCARD_' + item._id}>
                                    <div className={styles.itemTitle}>{item.name}</div>
                                    <div className={styles.itemPrice}>{'$' + item.monthly_price + ' / month'}</div>
                                    <div className={styles.itemImage}>
                                        <Image src={item.imgur} width={70} height={160} />
                                    </div>
                                    <div className={styles.itemCategory}>{item.product}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Final
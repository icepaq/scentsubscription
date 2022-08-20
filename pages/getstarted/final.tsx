import Cookies from "js-cookie"
import { useEffect, useRef, useState } from "react"
import styles from '../../styles/Final.module.css'
import { useRouter } from 'next/router'
import Image from "next/image"
import Swal from 'sweetalert2'
import WhiteAndSpinner from '../components/loader/spinner_white'
import { renderToString } from 'react-dom/server'
import { RunFadeIn } from "../../scripts/scripts"

type Item = {
    _id: string,
    name: string,
    product: string,
    monthly_price: number,
    imgur: string,
}

const Final = () => {

    const [recommendations, setRecommendations] = useState<Item[]>([]);
    const [futureRecommendations, setFutureRecommendations] = useState<Item[]>([]);
    const [futureRecommendationsObject, setFutureRecommendationsObject] = useState<Item[][]>([]);

    const products = useRef<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        async function processRecommendations(_params: URLSearchParams) {
            const results = await fetch('/api/getitems', {method: 'POST', body: _params}).then(res => res.json());
            let tempRecommendations: Item[] = [];
            for (const key in results[0]) {
                const item: Item = {
                    _id: results[0][key]._id,
                    name: results[0][key].name,
                    product: results[0][key].product,
                    monthly_price: results[0][key].monthly_price,
                    imgur: results[0][key].imgur,
                }

                tempRecommendations.push(item);
            }
            console.log(results)

            const _futureRecommendations: Item[] = [];
            const _futureRecommendationsObject: Item[][] = [];
            for (let i = 1; i < results.length; i++) {
                let tempitem = [];
                for (const key in results[i]) {
                    const item: Item = {
                        _id: results[i][key]._id,
                        name: results[i][key].name,
                        product: results[i][key].product,
                        monthly_price: results[i][key].monthly_price,
                        imgur: results[i][key].imgur,
                    }
                    tempitem.push(item);
                    _futureRecommendations.push(item);

                }
                _futureRecommendationsObject.push(tempitem);
            }            
            
            setRecommendations(tempRecommendations);
            setFutureRecommendations(_futureRecommendations);
            setFutureRecommendationsObject(_futureRecommendationsObject);
        }

        RunFadeIn();

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

                const params2 = new URLSearchParams();
                params.append('products', JSON.stringify(recommendations));
                params.append('futureProducts', JSON.stringify(futureRecommendationsObject));
                params.append('email', result.value);

                fetch('/api/storecredentials/createemail', {method: 'POST', body: params});
                fetch('/api/storerecommendations', {method: 'POST', body: params});

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

    const showFutures = async (product: string) => {
        const futures = [];
        for(let i = 0; i < futureRecommendations.length; i++) {
            if (futureRecommendations[i].product === product) {
                futures.push(futureRecommendations[i]);
            }
        }

        Swal.fire({
            html: renderToString(
                <><div>
                    {
                        futures.map((item: Item) => {
                            return (
                                <div className={styles.future} key={'key_'}>
                                    <span className={styles.futureElement}>
                                        {item.name}
                                    </span>
                                    {/* <span className={styles.futureButton}>
                                        Make this my First Product
                                    </span> */}
                                </div>
                            )
                        })
                    }
                    You will have the option to edit or remove these in your account settings
                </div></>)
        })
    }

    return (
        <>
            <WhiteAndSpinner />
            <div className={styles.container}>
                <div className={styles.title}>
                    Here is your first month package
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
                                <>                                
                                    <div className={styles.item} key={'PRODUCTCARD_' + item._id}>
                                        <div className={styles.itemTitle}>{item.name}</div>
                                        <div className={styles.itemPrice}>{'$' + item.monthly_price + ' / month'}</div>
                                        <div className={styles.itemImage}>
                                            <Image src={item.imgur} width={70} height={160} />
                                        </div>
                                        <div className={styles.itemCategory}>{item.product}</div>

                                        <div className={styles.futureProducts} onClick={() => {showFutures(item.product)}} >
                                            See Future Products
                                        </div>
                                    </div>
                                </>

                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Final
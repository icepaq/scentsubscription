import styles from '../../../styles/Cancel.module.css';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const Cancel = () => {

    const [couponUsed, setCouponUsed] = useState(false);

    useEffect(() => {
        const main = async () => {
            const params = new URLSearchParams();
            params.append("email", Cookies.get("email") as string);
            params.append("coupon", "cancel");

            const r = await fetch(SITE_URL + "/api/data/checkcoupon", { body: params, method: "POST" }).then(res => res.json());
            setCouponUsed(r.used);
        }

        main()
    })

    const submitCancelInfo = async (e: any) => {
        const info = []
        const selections = document.querySelectorAll('input[type=checkbox]:checked');
        selections.forEach((selection) => {
            info.push(selection.id);
        })

        info.push((document.getElementById('reason') as HTMLInputElement).value);

        const params = new URLSearchParams();
        params.append('info', info.join(', '));
        params.append('email', Cookies.get('email') as string);

        await fetch(process.env.NEXT_PUBLIC_SITE_URL + "/api/data/cancelreason", { method: 'POST', body: params })

    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.title}>
                        We are sorry to see you go
                    </div>
                    <div className={styles.subTitle}>
                        Please let us know what we could have done better
                    </div>
                    <div className={styles.form}>
                        <input className={styles.checkbox} type="checkbox" id="expensive" name="expensive" value="Bike" />
                        <div className={styles.labelText}>Too expensive</div> <br />

                        <input className={styles.checkbox} type="checkbox" id="lack" name="lack" value="Bike" />
                        <div className={styles.labelText}>Lack of Products</div> <br />

                        <input className={styles.checkbox} type="checkbox" id="complicated" name="complicated" value="Bike" />
                        <div className={styles.labelText}>Platform too complicated</div> <br />
                        
                        <input className={styles.checkbox} type="checkbox" id="other" name="other" value="Bike" />
                        <div className={styles.labelText}>Other</div> <br />

                        <input id='reason' type={'text'} className={styles.input} placeholder={'Please specify (optional)'} />
                    </div>

                    <div className={styles.row}>
                        <Link href={'/manage/orders'}>
                            <div className={styles.button}>Go Back</div>
                        </Link>
                        <Link href={couponUsed ? '/manage/cancel/cancel' : '/manage/cancel/2'}>
                            <div className={styles.button} onClick={submitCancelInfo}>Continue</div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cancel;
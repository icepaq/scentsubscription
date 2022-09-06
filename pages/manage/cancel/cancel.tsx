import { useEffect } from 'react';
import styles from '../../../styles/Cancel.module.css';
import Cookies from 'js-cookie';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const Cancel = () => {

    useEffect(() => {
        const params = new URLSearchParams();
        params.append("email", Cookies.get("email") as string);
        params.append("password", r);

        fetch(SITE_URL + "/api/stripe/cancel", { body: params, method: "POST" }).then(res => res.json());
    }, [])

    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.title}>
                        Your Subscription has been cancelled    
                    </div>
                    <div className={styles.text}></div>                    
                    <div className={styles.row}>
                        <div className={styles.button}>Renew Subscription</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cancel;
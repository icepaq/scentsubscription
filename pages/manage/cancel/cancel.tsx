import { useEffect, useState } from 'react';
import styles from '../../../styles/Cancel.module.css';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const Cancel = () => {

    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {

        const main = async () => {
            const r = await Swal.fire({
                title: 'Are you sure?',
                text: "Please enter your password to cancel",
                input: 'password',
            }).then(r => r.value);
    
            if (r) {
                // TODO: Add frontend verification of password
                const params = new URLSearchParams();
                params.append("email", Cookies.get("email") as string);
                params.append("password", r);
                fetch(SITE_URL + "/api/stripe/cancel", { body: params, method: "POST" }).then(res => res.json());
                setCancelled(true);
            }
        }

        main();
    }, [])

    return (
        cancelled ?
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

        :

        null
    )
}

export default Cancel;
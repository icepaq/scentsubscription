import { useEffect, useRef } from "react";
import styles from '../../styles/AfterCheckout.module.css'
import { useRouter } from 'next/router'

const AfterCheckout = () => {

    const router = useRouter();
    const email = useRef<string>('');
    const password = useRef<string>('');

    useEffect(() => {
        const url = new URL(window.location.href);
        const session_id = url.searchParams.get("session_id");

        const params = new URLSearchParams();
        params.append("session_id", session_id as string);

        fetch('/api/stripe/getsession', { method: 'POST', body: params })
            .then(response => response.json())
            .then(data => {

                email.current = data.customer_details.email;

                const stripe_params = new URLSearchParams();
                stripe_params.append("id", data.id);
                stripe_params.append("subscription", data.subscription);
                stripe_params.append("amount_total", data.amount_total);
                stripe_params.append("customer", data.customer);
                stripe_params.append("city", data.customer_details.address.city);
                stripe_params.append("country", data.customer_details.address.country);
                stripe_params.append("line1", data.customer_details.address.line1);
                stripe_params.append("line2", data.customer_details.address.line2);
                stripe_params.append("postal_code", data.customer_details.address.postal_code);
                stripe_params.append("state", data.customer_details.address.state);
                stripe_params.append("email", data.customer_details.email);
                stripe_params.append("name", data.customer_details.name);
                stripe_params.append("phone", data.customer_details.phone);
                stripe_params.append("plan", data.plan);

                fetch('/api/storecredentials/populateuser', { method: 'POST', body: stripe_params })
            })
    }, []);

    const handleSubmit = async (e: any) => {
        const params = new URLSearchParams();
        const url = new URL(window.location.href);
        console.log(email.current)
        params.append("id", url.searchParams.get("session_id") as string);
        params.append("email", email.current);
        params.append("password", password.current);

        await fetch('/api/auth/setpassword', { method: 'POST', body: params })

        router.push('/manage/main');
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.title}>
                    Thank you for ordering with us!
                </div>
                <div className={styles.subtitle}>
                    Your order is being processed and will ship out soon. Generally packages go out on Thursday and are sent out via UPS or FedEx.
                </div>
                <div className={styles.enterPasswordText}>
                    To track your orders, please set a password
                </div>
                <div className={styles.password}>
                    <input className={styles.input} type="password" placeholder="Password" onChange={(e) => { password.current = e.target.value }}/>
                </div>
                <div className={styles.submitWrapper}>
                    <div className={styles.submit} onClick={handleSubmit}>
                        Continue
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AfterCheckout;
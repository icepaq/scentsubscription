import { useEffect, useState } from "react";
import styles from "../../styles/Account.module.css";
import Sidebar from "../components/sidebar";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const Account = () => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [line1, setline1] = useState("");
    const [line2, setline2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [postal_code, setPostalCode] = useState("");
    const [plan, setPlan] = useState("");

    const [cancelled, setCancelled] = useState(false);

    const router = useRouter();

    useEffect(() => {

        const main = async () => {
            const params = new URLSearchParams();
            params.append("email", Cookies.get("email") as string);
            const r = await fetch(SITE_URL + "/api/auth/getuser", { body: params, method: "POST" }).then(res => res.json());

            if (r.status == 200) {
                setName(r.user.stripe_params.name);
                setPhone(r.user.stripe_params.phone);
                setline1(r.user.stripe_params.line1);
                setline2(r.user.stripe_params.line2);
                setCity(r.user.stripe_params.city);
                setState(r.user.stripe_params.state);
                setCountry(r.user.stripe_params.country);
                setPostalCode(r.user.stripe_params.postal_code);
                setCancelled(r.user.cancelled);
                setPlan(r.user.stripe_params.plan);
            }
        }

        const token = Cookies.get('token');
        const email = Cookies.get('email');

        if (!token || !email) {
            router.push('/login');
        }

        main();

    }, [])

    const updateUser = async (e: any) => {
        const params = new URLSearchParams();
        params.append("email", Cookies.get("email") as string);
        params.append("name", name);
        params.append("phone", phone);
        params.append("line1", line1);
        params.append("line2", line2);
        params.append("city", city);
        params.append("state", state);
        params.append("country", country);
        params.append("postal_code", postal_code);

        await fetch(SITE_URL + "/api/auth/updateuser", { body: params, method: "POST" }).then(res => res.json());

        router.reload();
        
    }

    const cancel = async (e: any) => {
        // Create a sweet alert to ask user for password, then check password against backend
       const r = await Swal.fire({
            title: 'Are you sure?',
            text: "Please enter your password to verify",
            input: 'password',
        }).then(r => r.value);

        if (r) {
            const params = new URLSearchParams();
            params.append("email", Cookies.get("email") as string);
            params.append("password", r);
            await fetch(SITE_URL + "/api/stripe/cancel", { body: params, method: "POST" }).then(res => res.json());

            router.reload();
        }
    }

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.wrapper}>
                <h1>Hi Anton,</h1>
                <div className={styles.boxTitle}>Profile</div>
                <div className={styles.boxWrapper}>
                    <div className={styles.box}>
                        <div className={styles.inputCombo}>
                            <div className={styles.inputLabel}>Name</div>
                            <input className={styles.input} type="text" value={name} onChange={(e) => {setName(e.target.value)}} />
                        </div>
                        <div className={styles.inputCombo}>
                            <div className={styles.inputLabel}>Phone</div>
                            <input className={styles.input} type="text" value={phone} onChange={(e) => {setPhone(e.target.value)}} />
                        </div>
                        <div className={styles.inputCombo}>
                            <div className={styles.inputLabel}>Address 1</div>
                            <input className={styles.input} type="text" value={line1} onChange={(e) => {setline1(e.target.value)}} />
                        </div>
                        <div className={styles.inputCombo}>
                            <div className={styles.inputLabel}>Address 2</div>
                            <input className={styles.input} type="text" value={line2} onChange={(e) => {setline2(e.target.value)}} />
                        </div>
                        <div className={styles.inputCombo}>
                            <div className={styles.inputLabel}>City</div>
                            <input className={styles.input} type="text" value={city} onChange={(e) => {setCity(e.target.value)}} />
                        </div>
                        <div className={styles.inputCombo}>
                            <div className={styles.inputLabel}>State / Province</div>
                            <input className={styles.input} type="text" value={state} onChange={(e) => {setState(e.target.value)}} />
                        </div>
                        <div className={styles.inputCombo}>
                            <div className={styles.inputLabel}>Postal Code</div>
                            <input className={styles.input} type="text" value={postal_code} onChange={(e) => {setPostalCode(e.target.value)}} />
                        </div>
                        <div className={styles.inputCombo}>
                            <div className={styles.inputLabel}>Country</div>
                            <input className={styles.input} type="text" value={country} onChange={(e) => {setCountry(e.target.value)}} />
                        </div>
                        <div className={styles.button} onClick={updateUser}>Update Profile</div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.inputCombo}>Current Plan - {'$' + (Number.parseInt(plan) / 100).toFixed(2) + ' / month'}</div>
                        <div className={styles.button}>Get Help</div>
                        <div className={styles.button} onClick={cancel}>{cancelled ? 'Renew Subscription' : 'Cancel Subscription'}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;

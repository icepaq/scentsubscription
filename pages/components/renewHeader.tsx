import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "../../styles/Account.module.css";
import { useRouter } from "next/router";


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const RenewHeader = () => {

    const [renewHeader, setRenewHeader] = useState<JSX.Element>(<></>);

    const router = useRouter();
    
    useEffect(() => {

        const main = async () => {
            const params = new URLSearchParams();
            params.append("email", Cookies.get("email") as string);
            const r = await fetch(SITE_URL + "/api/auth/getuser", { body: params, method: "POST" }).then(res => res.json());

            if (r.status == 200) {

                if (r.user.cancelled) {
                    setRenewHeader(
                        <div className={styles.renewHeader}>
                            Your subscription has been cancelled. 
                            Click <a href="/manage/account" className={styles.link}>here</a> to renew.
                        </div>
                    );
                }
            } else {
                router.push("/login");
            }
        }

        const token = Cookies.get('token');
        const email = Cookies.get('email');

        if (!token || !email) {
            router.push('/login');
        }

        main();

    }, [])

    return renewHeader;
}

export default RenewHeader
import styles from '../styles/Login.module.css'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const Login = () => {

    const router = useRouter();

    const submit = async () => {
        const email = (document.getElementById('email') as HTMLInputElement).value
        const password = (document.getElementById('password') as HTMLInputElement).value

        const params = new URLSearchParams();
        params.append('email', email);
        params.append('password', password);

        const r = await fetch('/api/auth/login', {method: 'POST', body: params}).then(res => res.json());

        if (r.status == 200) {
            Cookies.set('token', r.token);
            Cookies.set('email', email);

            router.push('/manage/main');
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Invalid email or password',
                icon: 'error'
            })
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <div className={styles.title}>
                            Login
                        </div>

                        <div className={styles.form}>
                            <input className={styles.formItem} type="text" placeholder="Email" id='email'/>
                            <input className={styles.formItem} type="password" placeholder="Password" id='password' />

                            <div className={styles.button} onClick={submit}>
                                Login
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
import Image from 'next/image';
import styles from '../../../styles/Cancel.module.css';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const Cancel = () => {

    const router = useRouter();

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
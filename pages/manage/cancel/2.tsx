import Image from 'next/image';
import styles from '../../../styles/Cancel.module.css';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const Cancel = () => {

    const router = useRouter();

    const applyDiscount = async (e: any) => {   
        const email = Cookies.get('email') as string;

        const params = new URLSearchParams();
        params.append('email', email);

        const r = await fetch(process.env.NEXT_PUBLIC_SITE_URL + "/api/auth/canceldiscount", { method: 'POST', body: params })

        if (r.status == 400) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! If this conitnues, please contact support.',
            })
        }

        if (r.status == 200) {
            await Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your discount has been applied.',
            })

            router.push('/manage/orders');
        }
    }   

    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.title}>
                        Before you go
                    </div>
                    <div className={styles.text}>
                        We would like to offer you 30% off your next month and will throw in a random fragrance fo free. This coupon will be automatically added to your profile.                    </div>
                    <div className={styles.coupon}>
                        <span className={styles.left}>
                            <Image src={'/squaredior.png'} height={150} width={150}/> 
                        </span>
                        <span className={styles.right}>
                            <div className={styles.top}>
                                <div className={styles.textWrap}>
                                    <span className={styles.bold}>30% Off</span>
                                    <span className={styles.light}> your next order</span>                                    
                                </div>
                            </div>
                            <div className={styles.bottom}>
                                <div className={styles.textWrap}>
                                    <span className={styles.bold}>+ FREE</span>
                                    <span className={styles.light}> random fragrance</span>      
                                </div>
                            </div>
                        </span>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.button}>No thank you, cancel</div>
                        <div className={styles.button} onClick={applyDiscount}>Yes please!</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cancel;
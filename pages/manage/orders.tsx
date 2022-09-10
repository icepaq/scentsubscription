import { useEffect, useState } from 'react'
import styles from '../../styles/Manage.module.css'
import Swal from 'sweetalert2'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import Sidebar from '../components/sidebar'
import RenewHeader from '../components/renewHeader'

type OrderEntry = {
    _id: string,
    name: string,
    product: string,
    monthly_price: number,
    imgur: string,
}


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
const Main = () => {

    const [orders, setOrders] = useState([]);
    const [categories, setCategories] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const apiCall = async () => {
            const params = new URLSearchParams();
            params.append('email', Cookie.get('email') as string);
            params.append('token', Cookie.get('token') as string);
            const res = await fetch(SITE_URL + '/api/orders/getorders', {method: 'POST', body: params}).then(res => res.json());
            setOrders(res.orders);
            setCategories(res.categories);
        }

        const token = Cookie.get('token');
        const email = Cookie.get('email');

        if (!token || !email) {
            router.push('/login');
        }

        apiCall()
    }, [])

    const monthNumberToName = (monthNumber: number, date: number) => {
        let ending = '';
        if (monthNumber === new Date().getMonth() + 1) {
            ending = ' (Current Month)';
        }
        switch (monthNumber) {
            case 1: return 'January ' + date + ending;
            case 2: return 'February ' + date + ending;
            case 3: return 'March ' + date + ending;
            case 4: return 'April ' + date + ending;
            case 5: return 'May ' + date + ending;
            case 6: return 'June ' + date + ending;
            case 7: return 'July ' + date + ending;
            case 8: return 'August ' + date + ending;
            case 9: return 'September ' + date + ending;
            case 10: return 'October ' + date + ending;
            case 11: return 'November ' + date + ending;
            case 12: return 'December ' + date + ending;
        }
    }

    const reOrder = async (month: number) => {
        Swal.fire(
            {
                title: 'Feature coming soon',
                text: 'This feature is coming in the next few days. Please contact support to have a specific product edited.',
            }
        )
    }

    const showEditOrder = (month: number, date: number) => {
        const orderButton = <>
            <div className={styles.cancelButton} onClick={() => reOrder(month)}>Edit Order</div>
        </>
        console.log(date, new Date().getDate())
        return (month >= new Date().getMonth() && date > new Date().getDate() ? orderButton : null);
    }


    const getHelp = (e: any) => {
        window.location.href = 'https://scentsubs.com/support';
    }

    return (
        <>
            <div className={styles.container}>
                <Sidebar />
                <div className={styles.wrapper}>
                    <RenewHeader />
                    <div className={styles.title}>
                        <h1>Your Orders</h1>
                    </div>

                    <div className={styles.orders}>
                        {orders?.map((order: any) => {
                            
                            if(order.order.length < 1) {
                                return;
                            } 

                            return (
                                <div className={styles.order} key={''}>
                                    <div className={styles.orderTitle}>
                                        { monthNumberToName(order.month, order.date) }
                                    </div>

                                    <div className={styles.orderContent}>
                                        <div className={styles.orderContentLeft}>
                                            <div className={styles.orderCategories}>
                                                Categories - {(categories[Number.parseInt(order.month)] as string[]).join(', ') }
                                            </div>

                                            <div className={styles.productTitle}>
                                                Products
                                            </div>
                                            {
                                            order.order.map((item: OrderEntry) => {
                                                return (
                                                    <>
                                                        <div className={styles.product} key={''}>
                                                            {item.name}
                                                        </div>
                                                    </>
                                                )})
                                            }
                                        </div>
                                        <div className={styles.orderContentRight}>
                                            <div className={styles.button} onClick={getHelp}>
                                                Get Help
                                            </div>
                                            { showEditOrder(order.month - 1, order.date) }
                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main
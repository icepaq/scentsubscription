import { useEffect, useState } from 'react'
import styles from '../../styles/Manage.module.css'
import Swal from 'sweetalert2'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'

type OrderEntry = {
    _id: string,
    name: string,
    product: string,
    monthly_price: number,
    imgur: string,
}


const Main = () => {

    const [orders, setOrders] = useState([]);
    const [categories, setCategories] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const apiCall = async () => {
            const params = new URLSearchParams();
            params.append('email', Cookie.get('email') as string);
            params.append('token', Cookie.get('token') as string);
            const res = await fetch('http://localhost:3000/api/orders/getorders', {method: 'POST', body: params}).then(res => res.json());
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

    const monthNumberToName = (monthNumber: number) => {
        let ending = '';
        if (monthNumber === new Date().getMonth()) {
            ending = ' (Current Month)';
        }
        switch (monthNumber) {
            case 0:
                return 'January' + ending;
            case 1:
                return 'February' + ending;
            case 2:
                return 'March' + ending;
            case 3:
                return 'April' + ending;
            case 4:
                return 'May' + ending;
            case 5:
                return 'June'   + ending;
            case 6:
                return 'July' + ending;
            case 7:
                return 'August' + ending;
            case 8:
                return 'September' + ending;
            case 9:
                return 'October' + ending;
            case 10:
                return 'November' + ending;
            case 11:
                return 'December' + ending;
        }
    }

    const reOrder = (e: any) => {
        Swal.fire({
            title: 'Feature Coming Soon',
        })
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <div className={styles.sidebarItems}>
                        <div className={styles.sidebarItem}>Orders</div>
                        <div className={styles.sidebarItem}>Account Settings</div>
                    </div>
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.title}>
                        <h1>Your Orders</h1>
                    </div>

                    <div className={styles.orders}>
                        {orders?.map((order: any) => {
                            return (
                                <div className={styles.order} key={''}>
                                    <div className={styles.orderTitle}>
                                        { monthNumberToName(order.month) }
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
                                            <div className={styles.button} onClick={reOrder}>
                                                Order Package Again
                                            </div>
                                            <div className={`${styles.button} ${styles.tooltip}`} onClick={reOrder}>
                                                <span className={styles.tooltiptext}>If you liked a certain product in this package, you can add it to a future package</span>
                                                Order Specific Product Again
                                            </div>
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
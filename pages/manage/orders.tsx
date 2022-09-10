import { useEffect, useState } from 'react'
import styles from '../../styles/Manage.module.css'
import Swal from 'sweetalert2'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import Sidebar from '../components/sidebar'

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
        if (monthNumber === new Date().getMonth() + 1) {
            ending = ' (Current Month)';
        }
        switch (monthNumber) {
            case 1: return 'January' + ending;
            case 2: return 'February' + ending;
            case 3: return 'March' + ending;
            case 4: return 'April' + ending;
            case 5: return 'May' + ending;
            case 6: return 'June'   + ending;
            case 7: return 'July' + ending;
            case 8: return 'August' + ending;
            case 9: return 'September' + ending;
            case 10: return 'October' + ending;
            case 11: return 'November' + ending;
            case 12: return 'December' + ending;
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

    const showEditOrder = (month: number) => {
        const orderButton = <>
            <div className={styles.cancelButton} onClick={() => reOrder(month)}>Edit Order</div>
        </>
        console.log(month, new Date().getMonth())
        return (month > new Date().getMonth() ? orderButton : null);
    }


    const getHelp = (e: any) => {
        router.push('/help');
    }

    return (
        <>
            <div className={styles.container}>
                <Sidebar />
                <div className={styles.wrapper}>
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
                                            <div className={styles.button} onClick={getHelp}>
                                                Get Help
                                            </div>
                                            { showEditOrder(order.month - 1) }
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
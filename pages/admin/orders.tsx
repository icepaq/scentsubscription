import { useEffect, useState } from 'react'
import styles from '../../styles/Orders.module.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const Orders = () => {

    const [orders, setOrders] = useState<any>({});

    useEffect(() => {
        fetch(`${SITE_URL}/api/admin/getorders`)
            .then(res => res.json())
            .then(data => {console.log(data); setOrders(data)})

        
    }, []);

    const handleChange = (e: any) => {
        console.log(e.target.value)
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>Orders</div>
            <div className={styles.input}>
                <input type="text" placeholder="Search" />
            </div>
            <div className={styles.orders}>
                {orders?.filtered?.map((order: any) => {
                    return (
                    <div className={styles.order}>
                        <span className={styles.left}>
                            <div className={styles.name}>{orders.users[order.user].name}</div>
                            <div className={styles.text}>{order.order.month + '-' + order.order.date + '-' + order.order.year }</div>
                            <div className={styles.text}>Pending</div>

                            <div className={styles.products}>
                                <div className={styles.subtitle}>Items</div>
                                <div className={styles.product}>
                                    <div className={styles.text}>{order.order.order.map( (o: any) => o.name)}</div>
                                </div>
                            </div>
                        </span>
                        <span className={styles.right}>
                            <div className={styles.subtitle}>Address</div>
                            <div className={styles.text}>{orders.users[order.user].line1}</div>
                            <div className={styles.text}>{orders.users[order.user].line2 == 'null' ? '' : orders.users[order.user].line2}</div>
                            <div className={styles.text}>{orders.users[order.user].city + ', ' + orders.users[order.user].state}</div>
                            <div className={styles.text}>{orders.users[order.user].postal_code}</div>
                            <div className={styles.text}>{orders.users[order.user].country}</div>

                            <div className={styles.subtitle}>Update Status</div>
                            <div className={styles.select}>
                                <select id='status' onChange={handleChange}>
                                    <option id='pending'>Pending</option>
                                    <option id='packaged'>Packaged</option>
                                    <option id='shipped'>Shipped</option>
                                </select>
                            </div>
                        </span>
                    </div>
                    )
                })}
                
            </div>
        </div>
    )
}

export default Orders
import styles from '../../styles/Manage.module.css'

const Main = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <div className={styles.sidebarItems}>
                        <div className={styles.sidebarItem}>Future Orders</div>
                        <div className={styles.sidebarItem}>Past Orders</div>
                        <div className={styles.sidebarItem}>Account Settings</div>
                    </div>
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.title}>
                        <h1>Hi Anton,</h1>
                    </div>

                    <div className={styles.orders}>
                        <div className={styles.order}>
                            <div className={styles.orderTitle}>
                                This Month (July 2022)
                            </div>
                            <div className={styles.orderContent}>
                                <div className={styles.orderContentLeft}>
                                    <div className={styles.orderCategories}>
                                        Categories — Fragrance, Car Refreshener
                                    </div>

                                    <div className={styles.productTitle}>
                                        Products
                                    </div>
                                    <div className={styles.product}>
                                        Dior Sauvage
                                    </div>
                                    <div className={styles.product}>
                                        Little Trees
                                    </div>
                                </div>
                                <div className={styles.orderContentRight}>
                                    <div className={styles.button}>
                                        Order Package Again
                                    </div>
                                    <div className={`${styles.button} ${styles.tooltip}`}>
                                        <span className={styles.tooltiptext}>If you liked a certain product in this package, you can add it to a future package</span>
                                        Order Specific Product Again
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main
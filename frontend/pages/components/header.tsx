import Image from 'next/image'
import styles from '../../styles/Header.module.css'

const Header = () => {
    return (
        <>
            <div className={styles.header}>

                <div className={styles.floatLeft}>
                    <span className={styles.logo}>
                        <Image src={'/logo.png'} width={'127px'} height={'30px'} />
                    </span>
                    <span className={styles.menu}>
                        <span className={styles.menuItem}>
                            <a href="#">Get Started</a>
                        </span>
                        <span className={styles.menuItem}>
                            <a href="#">Home</a>
                        </span>
                        <span className={styles.menuItem}>
                            <a href="#">About</a>
                        </span>
                        <span className={styles.menuItem}>
                            <a href="#">Contact Us</a>
                        </span>
                    </span>
                </div>

                <div className={styles.floatRight}>
                    <span className={styles.login}>
                        Login
                    </span>
                </div>
            </div>
        </>
    )
}

export default Header
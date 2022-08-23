import styles from "../../styles/Account.module.css";
import Sidebar from "../components/sidebar";

const Account = () => {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.wrapper}>
                <h1>Hi Anton,</h1>
                <div className={styles.boxTitle}>Profile</div>
                <div className={styles.boxWrapper}>
                    <div className={styles.box}>
                        <div className={styles.inputCombo}>
                            <div className={styles.inputLabel}>Name</div>
                            <input className={styles.input} type="text" />
                        </div>
                        <div className={styles.inputCombo}>
                            <div className={styles.inputLabel}>
                                Phone Number
                            </div>
                            <input className={styles.input} type="text" />
                        </div>
                        <div className={styles.inputCombo}>
                            <div className={styles.inputLabel}>
                                Address Line 1
                            </div>
                            <input className={styles.input} type="text" />
                        </div>
                        <div className={styles.inputCombo}>
                            <div className={styles.inputLabel}>
                                Address Line 2
                            </div>
                            <input className={styles.input} type="text" />
                        </div>
                        <div className={styles.inputCombo}>
                            <div className={styles.inputLabel}>City</div>
                            <input className={styles.input} type="text" />
                        </div>
                        <div className={styles.inputCombo}>
                            <div className={styles.inputLabel}>
                                Province / State
                            </div>
                            <input className={styles.input} type="text" />
                        </div>
                        <div className={styles.inputCombo}>
                            <div className={styles.inputLabel}>Country</div>
                            <input className={styles.input} type="text" />
                        </div>
                        <div className={styles.button}>Update Profile</div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.button}>Get Help</div>
                        <div className={styles.button}>Cancel Subscription</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;

import styles from '../../../styles/Cancel.module.css';

const Cancel = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.title}>
                        We are sorry to see you go
                    </div>
                    <div className={styles.subTitle}>
                        Please let us know what we could have done better
                    </div>
                    <div className={styles.form}>
                        <input className={styles.checkbox} type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                        <div className={styles.labelText}>Too expensive</div> <br />

                        <input className={styles.checkbox} type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                        <div className={styles.labelText}>Lack of Products</div> <br />

                        <input className={styles.checkbox} type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                        <div className={styles.labelText}>Platform too complicated</div> <br />
                        
                        <input className={styles.checkbox} type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                        <div className={styles.labelText}>Other</div> <br />

                        <input type={'text'} className={styles.input} placeholder={'Please specify (optional)'} />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.button}>Go Back</div>
                        <div className={styles.button}>Continue</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cancel;
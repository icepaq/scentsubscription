import styles from '../../../styles/Spinner.module.css'

const WhiteAndSpinner = () => {
    return (
        <div className={styles.white_background} id='white_background'>
            <div className={styles.spinner} id='spinner' />
        </div>
    );
}

export default WhiteAndSpinner
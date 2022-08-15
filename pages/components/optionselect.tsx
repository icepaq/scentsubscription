import styles from '../../styles/GetStarted.module.css'
import Image from 'next/image'

const OptionSelect: any = ({options, select}: any) => {
    return (
        <div className={styles.option} key={options.id} id={options.id} onClick={() => {select(options.id, options.text)}}>
            <div className={styles.positionBottom}>
                <div className={styles.optionImage} style={{marginTop: options.imageMarginTop}}>
                    <Image src={options.icon} width={options.width} height={options.height} />
                </div>
                <div className={styles.optionText} style={{marginTop: options.textMarginTop}}>
                    {options.text}
                </div>
            </div>
        </div>
    )
}

export default OptionSelect
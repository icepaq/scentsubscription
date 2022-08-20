import styles from '../../styles/GetStarted.module.css'
import Image from 'next/image'

const OptionSelect: any = ({options, select}: any) => {

    return (
        <div className={styles.option} key={''} id={options?.id} onClick={() => {select(options?.id, options?.text)}}>
            <div className={styles.positionBottom}>
                <div className={styles.optionImage} style={{marginTop: options?.imageMarginTop || '0px'}}>
                    <Image src={options?.icon || 'diorsauvage.jpg'} width={options?.width || '100px'} height={options?.height || '0px'} />
                </div>
                <div className={styles.optionText} style={{marginTop: options?.textMarginTop || '0px'}}>
                    {options?.text || 'Error. Please contact site admin'}
                </div>
            </div>
        </div>
    )
}

export default OptionSelect
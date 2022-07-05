import { useRef } from 'react'
import styles from '../../styles/GetStarted.module.css'
import OptionSelect from './optionselect'

const FormSlider = ({options, question, step}: any): any => {

    const selectedItems = useRef<string[]>([]);
    const select = (id: string) => {
        
        const box = document.getElementById(id) as HTMLElement;
        if (selectedItems.current.includes(id)) {
            box?.setAttribute('style', 'border-color: black; border-width: 2px');
            selectedItems.current = selectedItems.current.filter(item => item !== id);
            
            return;
        }

        box?.setAttribute('style', 'border-color: #13eb30; border-width: 4px');
        selectedItems.current.push(id);
    }

    return (
        <>
            <div className={styles.formSlider}>
                <div className={styles.step}>
                    {step}
                </div>
                <div className={styles.stepQuestion}>
                    {question}
                </div>
                <div className={styles.selectOptions}>

                    {
                        options.map((option: any) => {
                            console.log(option)
                            return <OptionSelect options={option} select={select}/>
                        })
                    }
                </div>
            </div>
        </>
    )
}



export default FormSlider
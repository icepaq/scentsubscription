import { useEffect, useRef } from 'react'
import styles from '../../styles/GetStarted.module.css'
import OptionSelect from './optionselect'
import Cookie from 'js-cookie'

const FormSlider = ({options, question, step, filter}: any): any => {

    const selectedItems = useRef<string[]>([]);
    const selectedItemsFilters = useRef<string[]>([]);

    useEffect(() => {
        try {
            const selectedItemsIDs = JSON.parse(Cookie.get(filter + '_number') as string);

            for(let i = 0; i < selectedItemsIDs.length; i++) {
                console.log(selectedItemsIDs[i]);
                document.getElementById(selectedItemsIDs[i])?.setAttribute('style', 'border-color: #13eb30; border-width: 4px');

            }
        } catch (error) {
            console.log(error);
        }

    }, [])

    const select = (id: string, property: string) => {
        
        const box = document.getElementById(id) as HTMLElement;
        if (selectedItems.current.includes(id)) {
            box?.setAttribute('style', 'border-color: black; border-width: 2px');
            
            selectedItems.current = selectedItems.current.filter(item => item !== id);
            selectedItemsFilters.current = selectedItemsFilters.current.filter(item => item !== property);
            
            Cookie.set(filter, JSON.stringify(selectedItemsFilters.current));
            Cookie.set(filter + '_number', JSON.stringify(selectedItems.current));

            console.log(selectedItemsFilters.current);

            return;
        }

        box?.setAttribute('style', 'border-color: #13eb30; border-width: 4px');

        selectedItems.current.push(id);
        selectedItemsFilters.current.push(property);

        Cookie.set(filter, JSON.stringify(selectedItemsFilters.current));
        Cookie.set(filter + '_number', JSON.stringify(selectedItems.current));

        console.log(selectedItemsFilters.current);
        console.log(Cookie.get(filter));
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
                            return <OptionSelect options={option} select={select} key={''}/>
                        })
                    }
                </div>
            </div>
        </>
    )
}



export default FormSlider
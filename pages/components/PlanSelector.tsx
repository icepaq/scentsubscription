import styles from "../../styles/GetStarted.module.css";
import { useEffect, useRef, useState } from "react";
import Cookie from "js-cookie";
import OptionSelect from "./optionselect";

const PlanSelector = ({title, updateBudget}: any) => {

    const [greenBorder, setGreenBorder] = useState(false);
    
    const selectedItems = useRef<string[]>([]);
    const selectedItemsFilters = useRef<string[]>([]);

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

    const handleClick = (id: string, text: string) => {
        console.log(id, text);
        select(id)
        const price = parseInt(id);
        updateBudget(title, price);
    }

    return (
        <>
            <div className={styles.inputRangeContainer}>
                <div className={styles.inputRangeTitle}>
                    {"Discounts applied at checkout"}
                </div>
                <div className={styles.selectOptions} style={{ paddingLeft: '10%', paddingRight: '10%'}}>
                    <OptionSelect
                        options={{
                            id: "15",
                            title: "Basic",
                            price: "$15",
                            text: "A good starting point",
                            textMarginTop: "70px",
                        }}
                        select={handleClick}
                    />

                    <OptionSelect
                        options={{
                            id: "35",
                            title: "Premium",
                            price: "$35",
                            text: "Explore higher grade colognes",
                            textMarginTop: "60px",
                        }}
                        select={handleClick}
                    />
                </div>
            </div>
        </>
    );
};

export default PlanSelector;

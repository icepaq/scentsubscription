import styles from "../../styles/GetStarted.module.css";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import OptionSelect from "./optionselect";

const PlanSelector = () => {
    const [value, setValue] = useState("10");

    const handleClick = (id: string, text: string) => {
        console.log(id, text);
    };

    return (
        <>
            <div className={styles.inputRangeContainer}>
                <div className={styles.inputRangeTitle}>
                    {"Discounts applied at checkout"}
                </div>
                <div className={styles.selectOptions} style={{ paddingLeft: '10%', paddingRight: '10%'}}>
                    <OptionSelect
                        options={{
                            id: "10",
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
                            textMarginTop: "70px",
                        }}
                        select={handleClick}
                    />
                </div>
            </div>
        </>
    );
};

export default PlanSelector;

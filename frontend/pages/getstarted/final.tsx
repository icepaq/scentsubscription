import Cookies from "js-cookie"
import { useEffect } from "react"

const Final = () => {
    useEffect(() => {
        const genderFilter = Cookies.get('GENDER');
        const productFilter = Cookies.get('PRODUCTS');
        const brandFilter = Cookies.get('BRANDS');
        const budgetFilter = Cookies.get('BUDGET');

        console.log(genderFilter);
        console.log(productFilter);
        console.log(brandFilter);
        console.log(budgetFilter);
    }, [])
}

export default Final
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

        const params = new URLSearchParams();
        params.append('product', productFilter as string);
        params.append('brand', brandFilter as string);
        params.append('gender', genderFilter as string);

        fetch('/api/getitems', {method: 'POST', body: params})
            .then(res => res.json())
            .then(r => console.log(r))

    }, [])
}

export default Final
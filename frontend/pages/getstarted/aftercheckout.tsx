import { useEffect } from "react";

const AfterCheckout = () => {

    useEffect(() => {
        const url = new URL(window.location.href);
        const session_id = url.searchParams.get("session_id");

        const params = new URLSearchParams();
        params.append("session_id", session_id as string);

        fetch('/api/stripe/getsession', { method: 'POST', body: params })
            .then(response => response.json())
            .then(data => {
                const stripe_params = new URLSearchParams();
                stripe_params.append("id", data.id);
                stripe_params.append("subscription", data.subscription);
                stripe_params.append("amount_total", data.amount_total);
                stripe_params.append("customer", data.customer);
                stripe_params.append("city", data.customer_details.address.city);
                stripe_params.append("country", data.customer_details.address.country);
                stripe_params.append("line1", data.customer_details.address.line1);
                stripe_params.append("line2", data.customer_details.address.line2);
                stripe_params.append("postal_code", data.customer_details.address.postal_code);
                stripe_params.append("state", data.customer_details.address.state);
                stripe_params.append("email", data.customer_details.email);
                stripe_params.append("name", data.customer_details.name);
                stripe_params.append("phone", data.customer_details.phone);

                fetch('/api/storecredentials/populateuser', { method: 'POST', body: stripe_params })
            })
    }, []);

    return (
        <div>
        <h1>After Checkout</h1>
        </div>
    );
}

export default AfterCheckout;
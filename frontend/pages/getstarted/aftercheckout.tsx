import { useEffect } from "react";

const AfterCheckout = () => {

    useEffect(() => {
        const url = new URL(window.location.href);
        const session_id = url.searchParams.get("session_id");

        const params = new URLSearchParams();
        params.append("session_id", session_id as string);

        fetch('/api/stripe/getsession', { method: 'POST', body: params })
    }, []);

    return (
        <div>
        <h1>After Checkout</h1>
        </div>
    );
}

export default AfterCheckout;
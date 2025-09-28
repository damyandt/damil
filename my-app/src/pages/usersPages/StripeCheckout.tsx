import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Box, Button, Typography } from "@mui/material";
import callApi from "../../API/callApi";
import { stripePaymentIntent } from "./api/postQuery";
import { useAuthedContext } from "../../context/AuthContext";
// ✅ Replace with your actual public key from Stripe Dashboard
const stripePromise = loadStripe(
  "pk_test_51QvfuNLUFZoOhiqe3J3T3jI2ZNGu3q9yZmrJH2vHWRG9QFT2RkzDkUf9PgxsSuC0uyjAE9BoVbP3GxNkNdp2UC8100WFoRALgJ"
);

interface StripeCheckoutProps {
  planType: string;
  amount: number; // in cents, e.g. 1500 = $15.00
}

const CheckoutForm: React.FC<StripeCheckoutProps> = ({ planType, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { setAuthedUser } = useAuthedContext();
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    try {
      // 1️⃣ Create PaymentIntent via backend
      //   const res = await fetch(
      //     "http://localhost:8080/api/v1/stripe/create-payment-intent
      //     ,
      //     {
      //       method: "POST",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify({ amount, currency: "usd", plan: planType }),
      //     }
      //   );

      //   const data = await res.json();
      const res = await callApi<any>({
        query: stripePaymentIntent(10),
        auth: { setAuthedUser },
      });
      const clientSecret = res.clientSecret;

      // 2️⃣ Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      // 3️⃣ Handle response
      if (result.error) {
        setMessage(`❌ ${result.error.message}`);
      } else if (
        result.paymentIntent &&
        result.paymentIntent.status === "succeeded"
      ) {
        setMessage("✅ Payment succeeded!");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 2 }}>
      <Typography variant="h6">Enter your card details:</Typography>
      <Box sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2 }}>
        <CardElement options={{ hidePostalCode: true }} />
      </Box>
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!stripe}
        sx={{ borderRadius: 2 }}
      >
        Pay ${(amount / 100).toFixed(2)} for {planType}
      </Button>
      {message && <Typography color="text.secondary">{message}</Typography>}
    </Box>
  );
};

const StripeCheckout: React.FC<StripeCheckoutProps> = (props) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm {...props} />
  </Elements>
);

export default StripeCheckout;

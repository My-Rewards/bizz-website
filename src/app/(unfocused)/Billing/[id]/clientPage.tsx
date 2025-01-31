"use client";
import { useState } from "react";
import { BillingInfo } from "./page";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
  AddressElement
} from '@stripe/react-stripe-js';
import { StripeElementsOptions, StripePaymentElementOptions, StripeAddressElementOptions } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_KEY ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY) : null;

const options: StripeElementsOptions = {
  mode: 'subscription',
  currency: 'usd',
  amount: 0,
  appearance: {
    theme: 'flat',
    variables: {
      fontFamily: ' "Gill Sans", sans-serif',
      fontLineHeight: '1.5',
      borderRadius: '10px',
      colorBackground: '#F6F8FA',
      accessibleColorOnColorPrimary: '#262626',
    },
    rules: {
      '.Block': {
        boxShadow: 'none',
        padding: '12px'
      },
      '.Input': {
        padding: '12px'
      },
      '.Input:disabled, .Input--invalid:disabled': {
        color: 'lightgray'
      },
      '.Tab:hover': {
        border: 'none',
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
      },
      '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
        border: 'none',
        backgroundColor: '#fff',
        boxShadow: '0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
      },
      '.Label': {
        fontWeight: '500'
      }
    }
  },
};

export default function ClientComponent({ data }: { data: BillingInfo }) {
  const [addPM, setAddPM] = useState(false);

  return (
    <div className="flex flex-1 flex-row">
      <div className="flex flex-1">
        <h1>{data.cost}</h1>
      </div>
      <div className="flex p-5 bg-color-3 flex-col bg-color-0">
        {addPM &&
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm />
          </Elements>
        }
        {addPM ?
          <div>
            <button onClick={() => { setAddPM(false) }}>
              Cancel
            </button>
          </div> :
          <div>
            <button onClick={() => { setAddPM(true) }}>
              Add Payment Method
            </button>
          </div>
        }
      </div>
    </div>
  );
}

const paymentElementOptions: StripePaymentElementOptions = {
  layout: 'tabs',
}

const addressElementOptions: StripeAddressElementOptions = {
  mode: 'billing',
  defaultValues: {
  },
  display:{
    name:'organization'
  }
}

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(undefined);

    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }

    // Get billing details
    const addressElement = elements.getElement('address');
    if (addressElement) {
      const { complete } = await addressElement.getValue();
      
      if (!complete) {
        setErrorMessage('Please fill out all required address fields.');
        setIsLoading(false);
        return;
      }
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement id="payment-element" options={paymentElementOptions} />

      <AddressElement id="address-element" options={addressElementOptions} />

      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <button 
        type="submit" 
        disabled={!stripe || !elements || isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md disabled:opacity-50"
      >
        {isLoading ? 'Processing...' : 'Add Payment Method'}
      </button>
    </form>
  );
}
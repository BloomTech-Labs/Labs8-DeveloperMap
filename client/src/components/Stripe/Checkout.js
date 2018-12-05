import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from './constants/stripe';
import PAYMENT_SERVER_URL from './constants/server';

const CURRENCY = 'USD'; // U.S Dollar , can pass type of currency here

const fromDollarToCent = amount => amount * 100; //Currency in the smallest unit


const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
};

// const onToken = (amount, description) => token =>  // Creates the token for you, so you can send all the necessary information to backend
//   axios.post(PAYMENT_SERVER_URL,
//     {
//       description,
//       source: token.id,
//       currency: CURRENCY,
//       amount: fromDollarToCent(amount)
//     })
//     .then(successPayment)
//     .catch(errorPayment);

const Checkout = ({ name, description, amount, currentSignedInUser}) => {
  const { uid } = currentSignedInUser;
  const onToken = (amount, description) => token =>  // Creates the token for you, so you can send all the necessary information to backend
  axios.post(PAYMENT_SERVER_URL,
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarToCent(amount)
    })
    .then(successPayment)
    .then(
      axios.post(`https://intense-stream-29923.herokuapp.com/api/database/companies/paysuccess`, {uid} )
    )
    .catch(errorPayment);

  return (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromDollarToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
  )
}

export default Checkout;
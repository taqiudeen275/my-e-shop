'use server'

import Stripe from 'stripe';




export async function createPaymentIntent(amount: number) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2024-06-20', // Use the latest API version
      });

    try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: 'usd',
        });
    
        return { clientSecret: paymentIntent.client_secret };
      } catch (error) {
        return { error: 'Error creating payment intent' };
      }

}
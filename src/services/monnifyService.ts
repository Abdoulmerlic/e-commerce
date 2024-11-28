import axios from 'axios';
import { MONNIFY_CONFIG } from '../config/monnify';

interface PaymentDetails {
  amount: number;
  customerName: string;
  customerEmail: string;
  paymentReference: string;
  paymentDescription: string;
}

export async function initializePayment(details: PaymentDetails) {
  try {
    const response = await axios.post(
      `${MONNIFY_CONFIG.API_URL}/api/v1/merchant/transactions/init-transaction`,
      {
        amount: details.amount,
        customerName: details.customerName,
        customerEmail: details.customerEmail,
        paymentReference: details.paymentReference,
        paymentDescription: details.paymentDescription,
        contractCode: MONNIFY_CONFIG.CONTRACT_CODE,
        currency: "NGN",
        paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],
      },
      {
        headers: {
          Authorization: `Bearer ${MONNIFY_CONFIG.API_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Payment initialization failed:', error);
    throw error;
  }
}
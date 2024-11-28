export const MONNIFY_CONFIG = {
  API_KEY: 'MK_TEST_XXXXXXXX',
  CONTRACT_CODE: 'YOUR_CONTRACT_CODE',
  API_URL: 'https://sandbox.monnify.com',
};

export const NAIRA_FORMATTER = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
});

//Country is USD and purchase has been made for 25 dollars. Unique shopper ID. This has been done through the web channel. 
const paymentMethodsConfig = {
    shopperReference: 'User-ID 123ABC',
    reference: 'textxyz',
    countryCode: 'DE',
    channel: 'Web',
    amount: {
        //amount of purchase by the customer 
        value: 25,
        currency: 'EUR',
    }
};


const paymentDetails = {
    paymentData: "Ab02b4c0!BQABAgA5n8BojT9WoVPldb+x54le3ziG3GkuE",
    details: {
            "key": "payload",
            "type": "text"
        }
    };


const paymentsDefaultConfig = {
    shopperReference: 'User-ID 123ABC',
    reference: 'textxyz',
    countryCode: 'DE',
    channel: 'Web',
    returnUrl: 'https://www.google.de',
    amount: {
        value: 25,
        currency: 'EUR'
    },
    lineItems: [
        {
            id: '1',
            description: 'Test Item 1',
            amountExcludingTax: 10000,
            amountIncludingTax: 11800,
            taxAmount: 1800,
            taxPercentage: 1800,
            quantity: 1,
            taxCategory: 'High'
        }
    ]
};

// Generic POST Helper
const httpPost = (endpoint, data) =>
    fetch(`/${endpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json());

// Get all available payment methods from the local server
const getPaymentMethods = () =>
    httpPost('paymentMethods', paymentMethodsConfig)
        .then(response => {
            if (response.error) throw 'No paymentMethods available';

            return response;
        })
        .catch(console.error);

const getPaymentDetails = () =>
    httpPost('payment/Details', paymentMethodsConfig)
        .then(response => {
            if (response.error) throw 'No paymentMethods available';
    
            return response;
        })
        .catch(console.error);

// Posts a new payment into the local server
const makePayment = (paymentMethod, config = {}) => {
    const paymentsConfig = { ...paymentsDefaultConfig, ...config };
    const paymentRequest = { ...paymentsConfig, ...paymentMethod };

    updateRequestContainer(paymentRequest);

    return httpPost('payments', paymentRequest)
        .then(response => {
            if (response.error) throw 'Payment initiation failed';

            updateResponseContainer(response);

            return response;
        })
        .catch(console.error);
};


const getPaymentDetails = () =>
    httpPost('paymentDetails', paymentsResponse)
        .then(response => {
            if (response.error) throw 'No paymentMethods available';

            return response;
        })
        .catch(console.error);


// Fetches an originKey from the local server; grabs the origin key 
const getOriginKey = () =>
    httpPost('originKeys')
        .then(response => {
            if (response.error || !response.originKeys) throw 'No originKey available';

            return response.originKeys[Object.keys(response.originKeys)[0]];
        })
        .catch(console.error);

const { CHECKOUT_APIKEY, CHECKOUT_URL, MERCHANT_ACCOUNT } = require('./config');

module.exports = (endpoint, request) => {
    const version = request.version != null ? request.version : 'v70';
    delete request.version;
    const body = JSON.stringify({
        merchantAccount: MERCHANT_ACCOUNT,
        ...request
    });

    const url = endpoint == '/disable' ? "https://pal-test.adyen.com/pal/servlet/Recurring/v68/disable" : `${CHECKOUT_URL}/v${version}/${endpoint}`
    return {
        body,
        url: url,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body, 'utf8'),
            'X-Api-Key': CHECKOUT_APIKEY
        }
    };
};

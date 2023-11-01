const { CHECKOUT_APIKEY, CHECKOUT_URL, MERCHANT_ACCOUNT, MARK_CHECKOUT_APIKEY, MARK_MERCHANT_ACCOUNT } = require('./config');

module.exports = (endpoint, request) => {
    const version = request.version != null ? request.version : '70';
    delete request.version;
    const APIKEY = request.merchantAccount == MARK_MERCHANT_ACCOUNT ? MARK_CHECKOUT_APIKEY : CHECKOUT_APIKEY;
    const body = JSON.stringify({
        ...request
    });

    if (!!request.details && !!request.merchantAccount) {
        delete request.merchantAccount;
    };

    const url = endpoint == '/disable' ? "https://pal-test.adyen.com/pal/servlet/Recurring/v68/disable" : `${CHECKOUT_URL}/v${version}/${endpoint}`
    return {
        body,
        url: url,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body, 'utf8'),
            'X-Api-Key': APIKEY
        }
    };
};

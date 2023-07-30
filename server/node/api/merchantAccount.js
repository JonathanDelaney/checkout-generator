const { MERCHANT_ACCOUNT: merchantAccount } = require('../utils/config');
const handleCallback = require('../utils/handleCallback');

module.exports = (res, request) => {
    handleCallback({ body: { merchantAccount } }, res);
};

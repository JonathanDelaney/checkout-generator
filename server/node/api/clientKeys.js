const { CLIENT_KEY, MARK_CLIENT_KEY } = require('../utils/config');
const getPostParameters = require("../utils/getPostParameters");
const handleCallback = require('../utils/handleCallback');

module.exports = (res, request) => {
    clientKey = request == 'amazonpay' ? MARK_CLIENT_KEY : CLIENT_KEY;
    handleCallback({ body: { clientKey } }, res);
};

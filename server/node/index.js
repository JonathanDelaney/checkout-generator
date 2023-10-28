require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const getPaymentMethods = require("./api/paymentMethods");
const balanceCheck = require("./api/balanceCheck");
const createOrder = require("./api/createOrder");
const cancelOrder = require("./api/cancelOrder");
const getOriginKeys = require("./api/originKeys");
const getClientKeys = require("./api/clientKeys");
const getMerchantAccount = require("./api/merchantAccount");
const makePayment = require("./api/payments");
const sessionsDropin = require("./api/sessions");
const submitDetails = require("./api/paymentDetails");
const cardDisable = require("./api/disable");
const makeSessionsCall = require("./api/webSdk");

module.exports = (() => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.use(express.static(path.resolve(__dirname, "../../src")));

  app.all("/originKeys", (req, res) => getOriginKeys(res, req));
  app.all("/paymentMethods", (req, res) => getPaymentMethods(res, req.body));
  app.all("/payments", (req, res) => makePayment(res, req.body));
  app.all("/payments/details", (req, res) => submitDetails(res, req.body));
  app.all("/paymentMethods/balance", (req, res) => balanceCheck(res, req.body));
  app.all("/orders", (req, res) => createOrder(res, req.body));
  app.all("/order/cancel", (req, res) => cancelOrder(res, req.body));
  app.all("/disable", (req, res) => cardDisable(res, req.body));
  app.all("/sessions", (req, res) => sessionsDropin(res, req.body));
  app.all("/webSdk", (req, res) => makeSessionsCall(res, req));
  app.all("/clientKeys", (req, res) => getClientKeys(res, req.body));
  app.all("/merchantAccount", (req, res) => getMerchantAccount(res, req));

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on localhost:${port}`));
})();

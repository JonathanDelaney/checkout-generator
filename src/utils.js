const httpPost = (endpoint, data) =>
    fetch(`/${endpoint}`, {
        method: "POST",
        headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());

const getClientKey = (thisComponent) =>
  httpPost("clientKeys", { component: thisComponent })
    .then((response) => {
      if (response.error || !response.clientKey) throw "No clientKey available";
      return response.clientKey;
    })
    .catch(console.error);

const getPaymentMethods = () =>
    httpPost("paymentMethods", paymentMethodsConfig)
        .then((response) => {
            if (response.error) throw "No paymentMethods available";
            return response;
        })
        .catch(console.error);

const makePayment = (paymentRequest) => {
  if (localStorage.getItem('balanceAmount') != null || localStorage.getItem('balanceAmount') || localStorage.getItem('balanceAmount') != undefined) {
    paymentRequest.amount = JSON.parse(localStorage.getItem('balanceAmount'));
    localStorage.removeItem('balanceAmount');
  }
  return httpPost("payments", paymentRequest)
    .then((response) => {
      if (response.paymentData) {localStorage.setItem("paymentData", response.paymentData)}
      if (!!response.order && response.order.remainingAmount.value > 0) {
        const remainingAmount = JSON.stringify(response.order.remainingAmount);
        localStorage.setItem('balanceAmount', remainingAmount);
        paymentsDefaultConfig.order = {
          orderData: response.order.orderData,
          pspReference: response.order.pspReference
        };
        paymentsDefaultConfig.amount = response.order.remainingAmount;
      } else {
        delete paymentsDefaultConfig.order;
        localStorage.removeItem('balanceAmount');
        paymentsDefaultConfig.amount.value = parseInt(localStorage.getItem('value'));
      }
      if (response.error) throw "Payment initiation failed";
      return response;
    })
    .catch(console.error);
};

const submitDetails = (details) => {
    if (localStorage.getItem("apiVersion") === null) {
      details.version = paymentsDefaultConfig.version;
    } else {
      details.version = localStorage.getItem("apiVersion");
    }
    return httpPost("payments/details", details)
      .then((response) => {
        return response;
      })
      .catch(console.error);
};

const getSession = (sessionRequest) => {
    delete sessionRequest.origin;
    delete sessionRequest.browserInfo;
    return httpPost("sessions", sessionRequest)
      .then((response) => {
        if (response.error) throw "Payment initiation failed";
        return response;
      })
      .catch(console.error);
};

const cardDisable = (storedPaymentMethodId, resolve, reject) => {
  return httpPost("disable", storedPaymentMethodId)
    .then((response) => {
      return response;
    })
    .catch(console.error);
};

const balanceCheck = (data) => {
  const balanceRequest = {
    amount: paymentsDefaultConfig.amount,
    merchantAccount: paymentsDefaultConfig.merchantAccount,
    paymentMethod: data.paymentMethod
  };
  return httpPost("paymentMethods/balance", balanceRequest)
    .then((response) => {
      if (response.resultCode == "NotEnoughBalance") {
        const balanceAmount = JSON.stringify(response.balance)
        localStorage.setItem('balanceAmount', balanceAmount);
      }
      return response;
    })
    .catch(console.error);
};

const createOrder = (data) => {
  const orderRequest = {
    amount: paymentsDefaultConfig.amount,
    merchantAccount: paymentsDefaultConfig.merchantAccount,
    reference: 'orderReference'
  };
  return httpPost("orders", orderRequest)
    .then((response) => {
      paymentsDefaultConfig.order = response;
      return response;
    })
    .catch(console.error);
};

const cancelOrder = (data) => {
  const cancelRequest = {
    order: {
      orderData: data.order.orderData,
      pspReference: data.order.pspReference
    },
    merchantAccount: paymentsDefaultConfig.merchantAccount
  };
  localStorage.removeItem('balanceAmount');
  paymentsDefaultConfig.amount.value = localStorage.getItem('value');
  return httpPost("orders/cancel", cancelRequest)
    .then((response) => {
      return response;
    })
    .catch(console.error);
};
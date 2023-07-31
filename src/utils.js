const httpPost = (endpoint, data) =>
    fetch(`/${endpoint}`, {
        method: "POST",
        headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());

const getClientKey = () =>
  httpPost("clientKeys")
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
    return httpPost("payments", paymentRequest)
      .then((response) => {
        if (response.paymentData) {localStorage.setItem("paymentData", response.paymentData)}
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

const onOrderCancel = (order) => {
  const cancelRequest = {
    order,
    merchantAccount: paymentsDefaultConfig.merchantAccount
  };
  return httpPost("/orders/cancel", cancelRequest)
    .then((response) => {
      return response;
    })
    .catch(console.error);
};
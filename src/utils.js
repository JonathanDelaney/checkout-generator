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
        if (response.paymentData) {localStorage.setItem("paymentData", response.paymentData);}
        if (response.error) throw "Payment initiation failed";
        return response;
      })
      .catch(console.error);
};

const submitDetails = (details) => {
  console.log(details.version = localStorage.getItem("apiVersion"));
    if (localStorage.getItem("apiVersion") === null) {
      details.version = paymentsDefaultConfig.version;
    } else {
      details.version = localStorage.getItem("apiVersion");
    }
    console.log(details);
    return httpPost("payments/details", details)
      .then((response) => {
        return response;
      })
      .catch(console.error);
};

const getSession = (sessionRequest) => {
    console.log(sessionRequest);
    return httpPost("sessions", sessionRequest)
      .then((response) => {
        if (response.error) throw "Payment initiation failed";
        return response;
      })
      .catch(console.error);
};

const cardDisable = (storedPaymentMethodId, resolve, reject) => {
  console.log("disabling card details");
  return httpPost("disable", storedPaymentMethodId)
    .then((response) => {
      return response;
    })
    .catch(console.error);
};
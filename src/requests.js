function setReturnUrl() {
    if (window.location.pathname) {
      return window.location.href + "returnUrl";
    } else {
      return "https://checkout-generator-4bd984f9651f.herokuapp.com/";
    }
  }

const expiryDate = () => {
  let date = new Date();
  return date.setMinutes(date.getMinutes() + 2);
}

const apiVersion = () => {
  let apiVersion
  if (localStorage.getItem("apiVersion") != null) {
    apiVersion = localStorage.getItem("apiVersion")
  } else {
    apiVersion = apiVersionList[0]
  }
  return apiVersion;
}

const sdkVersion = () => {
  let sdkVersion;
  if (localStorage.getItem("sdkVersion") != null) {
    sdkVersion = localStorage.getItem("sdkVersion");
  } else {
    sdkVersion = sdkVersionList[0];
  }
  return sdkVersion;
}

const component = () => {
  let component;
  if (localStorage.getItem("component") != null) {
    component = localStorage.getItem("component");
  } else {
    component = componentList[0];
  }
  return component;
}

const flow = () => {
  let flow;
  if (localStorage.getItem("flow") != null) {
    flow = localStorage.getItem("flow");
  } else {
    flow = 'advanced';
  }
  return flow;
}

const currency = () => {
  let currency;
  if (localStorage.getItem("currency") != null) {
    currency = localStorage.getItem("currency");
  } else {
    currency = "EUR";
    localStorage.setItem("currency", currency);
  }
  return currency;
}

const value = () => {
  let value;
  if (localStorage.getItem("value") != null) {
    value = parseInt(localStorage.getItem("value"));
  } else {
    value = 5900;
    localStorage.setItem("value", value)
  }
  return value;
}

const countryCode = () => {
  let countryCode;
  if (localStorage.getItem("countryCode") != null) {
    countryCode = localStorage.getItem("countryCode");
  } else {
    countryCode = "SE";
    localStorage.setItem("countryCode", countryCode);
  }
  return countryCode;
}

const httpPostOne = (endpoint, data) =>
  fetch(`/${endpoint}`, {
      method: "POST",
      headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  }).then((response) => response.json());

const getMerchantAccount = () =>
  httpPostOne("merchantAccount")
    .then(async (response) => {
      if (response.error || !response.merchantAccount) throw "No merchantAccount available";
      paymentsDefaultConfig.merchantAccount = await response.merchantAccount;
      return response.merchantAccount;
    })
    .catch(console.error);

let paymentMethodsConfig = {
  version: apiVersion(),
  reference: "xyz",
  countryCode: countryCode(),
  shopperLocale: "en-GB",
  shopperReference: "xyz",
  amount: {
    value: value(),
    currency: currency(),
  }
};
  
let paymentsDefaultConfig = {
    amount: {
      value: value(),
      currency: currency(),
    },
    recurringProcessingModel : "CardOnFile",
    shopperInteraction: "Ecommerce",
    countryCode : countryCode(),
    version: apiVersion(),
    shopperLocale: "en_GB",
    returnUrl: setReturnUrl(),
    reference : "xyz",
    merchantAccount: getMerchantAccount(),
    lineItems:  [
      {
        id: "1",
        description: "Test Item 1",
        amountExcludingTax: 5000,
        amountIncludingTax: 5900,
        taxAmount: 900,
        taxPercentage: 1800,
        quantity: 1,
        taxCategory: "High",
        imageUrl: "https://cdn.dsmcdn.com/ty18/product/media/images/20201026/12/19682072/97612972/1/1_org_zoom.jpg"
      },
    ],
    shopperReference : "xyz",
    shopperEmail: "customer+success@email.se",
    telephoneNumber: "+46701740615",
    dateOfBirth: "1970-07-10",
    socialSecurityNumber: "194103219202",
    shopperName: {
      firstName: "Test",
      lastName: "Person-se"
    },
    billingAddress: {
      city: "Stockholm",
      country: "SE",
      houseNumberOrName: "3",
      postalCode: "11 460",
      street: "Karlaplan"
    },
    deliveryAddress: {
      city: "Stockholm",
      country: "SE",
      houseNumberOrName: "3",
      postalCode: "11 460",
      street: "Karlaplan"
    }
};

const additionalParams = {
  additionalData : {
    RequestedTestAcquirerResponseCode: 2,
    executeThreeD : true,
    manualCapture: true
  },
  allowedPaymentMethods: ["scheme", "googlepay"],
  authenticationData: {
    attemptAuthentication: "always",
    authenticationOnly: true,
    threeDSRequestData: {
      nativeThreeDS: "preferred"
    }
  },
  blockedPaymentMethods: ["scheme", "googlepay"],
  captureDelayHours: 1,
  channel: "web",
  enableOneClick: true,
  enableRecurring: true,
  mcc: "7372",
  merchantOrderReference: "xyzijk",
  metadata: {
    sumParam: "sumData"
  },
  origin: setReturnUrl(),
  redirectFromIssuerMethod: "GET",
  redirectToIssuerMethod: "GET",
  sessionValidity: expiryDate(),
  shopperStatement: "somename",
  storePaymentMethod: true,
  storePaymentMethodMode: "askForConsent",
  threeDS2RequestData: {
    merchantName: "Sample name change"
  },
}

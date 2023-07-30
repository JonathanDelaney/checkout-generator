function setReturnUrl() {
    if (window.location.pathname) {
      return window.location.href + "returnurl";
    } else {
      return "http://localhost:3001/";
    }
  }

const date = new Date();
const expiryDate = date.setMinutes(date.getMinutes() + 2);

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
  
let apiVersion = apiVersionList[0];
let sdkVersion = sdkVersionList[0];
let component = componentList[0];
let flow = "advanced";

let paymentMethodsConfig = {
  version: apiVersion,
  reference: "xyz",
  countryCode: "SE",
  shopperLocale: "en-GB",
  shopperReference: "xyz",
  amount: {
    value: 5900,
    currency: "SEK",
  }
};
  
let paymentsDefaultConfig = {
    amount: {
        currency: "SEK",
        value: 5900
    },
    recurringProcessingModel : "CardOnFile",
    shopperInteraction: "Ecommerce",
    countryCode : "SE",
    version: apiVersion,
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
  sessionValidity: expiryDate,
  shopperStatement: "somename",
  storePaymentMethod: true,
  storePaymentMethodMode: "askForConsent",
  threeDS2RequestData: {
    merchantName: "Sample name change"
  },
}

if (localStorage.getItem("apiVersion") != null) {
  apiVersion = localStorage.getItem("apiVersion")
  paymentMethodsConfig.version = apiVersion;
  paymentsDefaultConfig.version = apiVersion;
}

if (localStorage.getItem("sdkVersion") != null) {
  sdkVersion = localStorage.getItem("sdkVersion")
}

if (localStorage.getItem("component") != null) {
  component = localStorage.getItem("component")
}

if (localStorage.getItem("flow") != null) {
  flow = localStorage.getItem("flow")
}

if (localStorage.getItem("countryCode") != null) {
  let countryCode = localStorage.getItem("countryCode")
  paymentMethodsConfig.countryCode = countryCode;
  paymentsDefaultConfig.countryCode = countryCode;
}

if (localStorage.getItem("currency") != null) {
  let currency = localStorage.getItem("currency")
  paymentMethodsConfig.amount.currency = currency;
  paymentsDefaultConfig.amount.currency = currency;
}

if (localStorage.getItem("value") != null) {
  let value = localStorage.getItem("value")
  paymentMethodsConfig.amount.value = value;
  paymentsDefaultConfig.amount.value = value;
}


amount = paymentsDefaultConfig.amount;
countryCode = paymentsDefaultConfig.countryCode;
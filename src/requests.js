function setReturnUrl() {
    if (window.location.pathname) {
      return window.location.href + "returnurl";
    } else {
      return "http://localhost:3001/";
    }
  }
  
let apiVersion = apiVersionList[0];

const paymentMethodsConfig = {
  version: apiVersion,
  reference: Math.random(),
  countryCode: "NL",
  shopperLocale: "en-GB",
  shopperReference: "xyz",
  amount: {
    value: 5900,
    currency: "EUR",
  }
};
  
let paymentsDefaultConfig = {
    amount: {
        currency: "EUR",
        value: 5900
    },
    recurringProcessingModel : "CardOnFile",
    shopperInteraction: "Ecommerce",
    countryCode : "NL",
    version: apiVersion,
    shopperLocale: "en_GB",
    returnUrl: setReturnUrl(),
    reference : "xyz",
    merchantAccount: "AdyenTechSupport_2021_Jonathand_TEST",
    lineItems:  [
      {
        id: "1",
        description: "Test Item 1",
        amountExcludingTax: 900,
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
  blockedPaymentMethods: ["scheme", "googlepay"],
  origin: setReturnUrl(),
  storePaymentMethod: true,
  redirectFromIssuerMethod: "GET",
  metadata: {
    sumParam: "sumData"
  },
  threeDS2RequestData: {
    merchantName: "Sample name change"
  },
  captureDelayHours: 1,
  additionalData : {
    RequestedTestAcquirerResponseCode: 2,
    executeThreeD : true,
    allow3DS2: true,
    manualCapture: false
  },
  enableRecurring: true,
  enableOneClick: true,
  shopperStatement: "somename",
  channel: "web",
}
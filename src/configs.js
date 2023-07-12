const componentConfigs = {
    paypal: {
        events: [
            "onInit",
            "onClick",
            "onShippingChange"
        ],
        mustConfigurations: [
            "amount",
            "countryCode"
        ],
        optConfigurations: [
            "style",
            "cspNonce",
            "blockPayPalCreditButton",
            "blockPayPalPayLaterButton",
            "enableMessages"
        ],
        strings: {
            essential: `amount: {
        currency: "EUR",
        value: 5900
    },
    countryCode: "NL",
    `
        }
    },
    ach: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
            "enableStoreDetails"
        ],
        strings: {
            essential:  `showPayButton: true,
            `
        }
    },
    affirm: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
            "visibility"
        ],
        strings: {
            essential:  `showPayButton: true,
            `
        }
    },
    afterpaytouch: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
        ],
        strings: {
            essential:  `showPayButton: true,
            `
        }
    },
    alipay: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
        ],
        strings: {
            essential:  `showPayButton: true,
            `
        }
    },
    alma: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
        ],
        strings: {
            essential:  `showPayButton: true,
            `
        }
    },
    applepay: {
        events: [
            "onClick",
            "onAuthorized",
            "onShippingContactSelected",
            "onShippingMethodSelected"
        ],
        mustConfigurations: [
            "amount",
            "countryCode"
        ],
        optConfigurations: [
            "buttonType",
            "buttonColor"
        ],
        strings: {
            essential: `amount: {
        currency: "EUR",
        value: 5900
    },
    countryCode: "NL",
    `
        }
    },
    ideal: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
        ],
        strings: {
            essential: `showPayButton: true,
            `
        }
    },
    googlepay: {
        events: [
            "onClick",
            "onAuthorized"
        ],
        mustConfigurations: [
        ],
        optConfigurations: [
            "buttonType",
            "buttonColor",
            "buttonSizeMode",
            "emailRequired",
            "shippingAddressRequired",
            "shippingOptionRequired"
        ],
        strings: {
            essential: ''
        }
    },
    card: {
        events: [
            "onBinLookup",
            "onBinValue",
            "onBrand",
            "onFieldValid",
            "onLoad",
            "onConfigSuccess",
            "onFocus"
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
            "brands",
            "enableStoreDetails",
            "hasHolderName",
            "holderNameRequired",
            "hideCVC",
            "billingAddressRequired",
            "billingAddressMode"
        ],
        strings: {
            essential: `showPayButton: true,
    `
        }
    },
    bcmc_mobile: {
        events: [
            "onClick"
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
        ],
        strings: {
            essential: `showPayButton: true,
            `
        }
    },
    dropin: {
        events: [
            "onDisableStoredPaymentMethod",
            "onReady"
        ],
        mustConfigurations: [
        ],
        optConfigurations: [
            "openFirstPaymentMethod",
            "openFirstStoredPaymentMethod",
            "showStoredPaymentMethods",
            "showRemovePaymentMethodButton",
            "showPaymentMethods",
        ],
        strings: {
            essential: ''
        }
    },
    klarna_paynow: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
        ],
        strings: {
            essential: `showPayButton: true,
            `
        }
    }
}

const componentEventConfigs = {
    onAuthorized: (resolve, reject, data) => {
        console.log("onAuthorized", data);
        resolve();
    },
    onBinLookup: (binData) => {
        conosle.log("onBinLookup", binData);
    },
    onBinValue: (binData) => {
        conosle.log("onBinValue", binData);
    },
    onBrand: (brandData) => {
        conosle.log("onBrand", brandData);
    },
    onFieldValid: (fieldData) => {
        conosle.log("onFieldValid", fieldData);
    },
    onLoad: (obj) => {
        conosle.log("onLoad", obj);
    },
    onConfigSuccess: (obj) => {
        conosle.log("onConfigSuccess", obj);
    },
    onFocus: (obj) => {
        conosle.log("onFocus", obj);
    },
    onShippingChange: (data, actions) => {
        console.log("onShippingChange", data);
        actions.resolve();
    },
    onInit: (data, actions) => {
        console.log("onInit", data);
        actions.enable();
    },
    onDisableStoredPaymentMethod: async (storedPaymentMethodId, resolve, reject) => {
        const disableReq = {
            "shopperReference": paymentsDefaultConfig.shopperReference,
            "recurringDetailReference": storedPaymentMethodId
        }
        console.log("onDisableStoredPaymentMethod");
        const disableRes = await cardDisable(disableReq)
        if (disableRes.response === "[detail-successfully-disabled]") {
          resolve();
        } else {
          reject();
        }
    },
    onReady: () => {
        console.log("Ready!!");
    },
    onClick: (resolve, reject) => {
        console.log('Button clicked');
        console.log(resolve);
        if (!resolve.fundingSource) {
            resolve();
        };
    },
    onAuthorized: (resolve, reject, event) => {
        console.log('Apple Pay onAuthorized', event);
        document.getElementById('response').innerText = JSON.stringify(event, null, 2);
        resolve();
    },
    onShippingContactSelected: (resolve, reject, event) => {
        console.log('Apple Pay onShippingContactSelected event', event);
        document.getElementById('response-two').innerText = JSON.stringify(event, null, 2);
        resolve();
    },
    onShippingMethodSelected: (resolve, reject, event) => {
        console.log('Apple Pay onShippingMethodSelected event', event);
        document.getElementById('response-three').innerText = JSON.stringify(event, null, 2);
        resolve();
    }
}

const mainEventConfigs = {
    beforeSubmit:  (data, component, actions) => {
        console.log(data, component);
        actions.resolve();
    },
    onSubmit: async (state, dropin) => {
        apiVersion = this.apiVersion;
        this.requestUpdate(state.data);
        const response =  await makePayment(this.overallRequest);
        this.addResponse(response);
        dropin.setStatus("loading");
        if (response.action) {
            dropin.handleAction(response.action);
        } else if (response.resultCode === "Authorised") {
            dropin.setStatus("success", { message: "Payment successful!" });
        } else if (response.resultCode !== "Authorised") {
            dropin.setStatus("error", { message: "Oops, try again please!" });
        }
    },
    onAdditionalDetails: async (state, dropin) => {
        apiVersion = this.apiVersion
        const response = await submitDetails(state.data);
        if (response.action) {
            dropin.handleAction(response.action);
        } else if (response.resultCode === "Authorised") {
            dropin.setStatus("success", { message: "Payment successful!" });
            setTimeout(function () {
                dropin.setStatus("ready");
            }, 2000);
        } else if (response.resultCode !== "Authorised") {
            dropin.setStatus("error", { message: "Oops, try again please!" });
            setTimeout(function () {
                dropin.setStatus("ready");
            }, 2000);
        }
    },
    onPaymentCompleted: (result, component) => {
        console.log(result, component);
    },
    onActionHandled: (data) => {
        console.log(data, component)
    },
    onChange: (state, component) => {
        console.log(state, component);
    },
    onError: (error, component) => {
        console.error(error, component);
    }
}

const optionalConfigurations = {
    amount: {
        value: 5900,
        currency: "EUR"
    },
    showPayButton: true,
    style: {
        layout: "vertical",
        color: "blue"
    },
    countryCode: "DE",
    cspNonce: "someNonce",
    enableMessages: true,
    blockPayPalCreditButton: true,
    blockPayPalPayLaterButton: true,
    buttonType: "CHECKOUT",
    buttonColor: "white",
    buttonSizeMode: "long",
    emailRequired: true,
    shippingAddressRequired: true,
    shippingOptionRequired: true,
    brands: ["amex", "mc", "visa"],
    enableStoreDetails: true,
    hasHolderName: true,
    holderNameRequired: true,
    hideCVC: true,
    billingAddressRequired: true,
    billingAddressMode: "full",
    openFirstPaymentMethod: false,
    openFirstStoredPaymentMethod: false,
    showStoredPaymentMethods: false,
    showRemovePaymentMethodButton: true,
    showPaymentMethods: false,
    visibility: {
        personalDetails: "hidden",
        billingAddress: "readOnly",
        deliveryAddress: "editable"
    }
}
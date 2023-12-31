let componentConfigs = {
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
    ach: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
            "hasHolderName",
            "holderNameRequired",
            "billingAddressRequired",
            "enableStoreDetails"
        ],
        strings: {
            essential:  `,
    showPayButton: true`
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
            essential:  `,
    showPayButton: true`
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
            essential:  `,
    showPayButton: true`
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
            essential:  `,
    showPayButton: true`
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
            essential:  `,
    showPayButton: true`
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
            essential: `,
    countryCode: "${countryCode()}",
    amount: {
        currency: "${currency()}",
        value: ${value()}
    }`
        }
    },
    atome: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
        ],
        strings: {
            essential:  `,
    showPayButton: true`
        }
    },
    directdebit_GB: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
        ],
        strings: {
            essential:  `,
    showPayButton: true`
        }
    },
    bcmc: {
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
            "billingAddressRequired"
        ],
        strings: {
            essential:  `,
    showPayButton: true`
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
            essential:  `,
    showPayButton: true`
        }
    },
    benefit: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
        ],
        strings: {
            essential:  `,
    showPayButton: true`
        }
    },
    bizum: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
        ],
        strings: {
            essential:  `,
    showPayButton: true`
        }
    },
    blik: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
        ],
        strings: {
            essential:  `,
    showPayButton: true`
        }
    },
    boletobancario: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
            "personalDetailsRequired",
            "billingAddressRequired",
            "showEmailAddress",
            "data"
        ],
        strings: {
            essential:  `,
    showPayButton: true`
        }
    },
    cashapp: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
            "enableStoreDetails",
            "storePaymentMethod",
            "button"
        ],
        strings: {
            essential:  `,
    showPayButton: true`
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
            "billingAddressMode",
            "showBrandsUnderCardNumber"
        ],
        strings: {
            essential:  `,
    showPayButton: true`
        }
    },
    dana: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
        ],
        strings: {
            essential:  `,
    showPayButton: true`
        }
    },
    duitnow: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
        ],
        strings: {
            essential:  `,
    showPayButton: true`
        }
    },
    eps: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
            "issuer",
            "highlightedIssuers",
            "placeholder"
        ],
        strings: {
            essential:  `,
    showPayButton: true`
        }
    },
    gcash: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
        ],
        strings: {
            essential:  `,
    showPayButton: true`
        }
    },
    giropay: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
        ],
        strings: {
            essential:  `,
    showPayButton: true`
        }
    },
    giftcard: {
        events: [
            "onBalanceCheck",
            "onOrderRequest"
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
        ],
        strings: {
            essential:  `,
    showPayButton: true`
        }
    },
    gopay_wallet: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
        ],
        strings: {
            essential:  `,
    showPayButton: true`
        }
    },
    grabpay_SG: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
        ],
        strings: {
            essential:  `,
    showPayButton: true`
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
            essential:  `,
    showPayButton: true`
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
    klarna_paynow: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
        ],
        strings: {
            essential:  `,
    showPayButton: true`
        }
    },
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
            essential: `,
    countryCode: "${countryCode()}",
    amount: {
        currency: "${currency()}",
        value: ${value()}
    }`
        }
    },
    swish: {
        events: [
        ],
        mustConfigurations: [
            "showPayButton"
        ],
        optConfigurations: [
        ],
        strings: {
            essential:  `,
    showPayButton: true`
        }
    }
}

const componentEventConfigs = {
    onAuthorized: (resolve, reject, data) => {
        console.log("onAuthorized", data);
        resolve();
    },
    onBalanceCheck: async (resolve, reject, data) => {
        const balanceResponse = await balanceCheck(data);
        resolve(balanceResponse);
    },
    onOrderRequest: async (resolve, reject, data) => {
        const orderResponse = await createOrder(data);
        resolve(orderResponse);
    },
    onBinLookup: (binData) => {
        console.log("onBinLookup", binData);
    },
    onBinValue: (binData) => {
        console.log("onBinValue", binData);
    },
    onBrand: (brandData) => {
        console.log("onBrand", brandData);
    },
    onFieldValid: (fieldData) => {
        console.log("onFieldValid", fieldData);
    },
    onLoad: (obj) => {
        console.log("onLoad", obj);
    },
    onConfigSuccess: (obj) => {
        console.log("onConfigSuccess", obj);
    },
    onFocus: (obj) => {
        console.log("onFocus", obj);
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
    onClick: component() == "paypal" ? () => {
        console.log("Paypal button clicked");
    } : (resolve, reject) => {
        console.log('Apple Pay button clicked');
        resolve();
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
            dropin.unmount();
            document.getElementById('componentDiv').innerHTML = "";
            document.getElementById('componentDiv').innerHTML = '<div class="adyen-checkout__status adyen-checkout__status--success"><img height="88" class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/success.gif" alt="Payment successful!"><span class="adyen-checkout__status__text">Payment successful!</span></div>';
        } else if (response.resultCode !== "Authorised") {
            dropin.unmount();
            document.getElementById('componentDiv').innerHTML = "";
            document.getElementById('componentDiv').innerHTML = '<div class="adyen-checkout__status adyen-checkout__status--error"><img class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/error.gif" alt="Oops, try again please!" height="88"><span class="adyen-checkout__status__text">Oops, try again please!</span></div>';
        }
    },
    onAdditionalDetails: async (state, dropin) => {
        apiVersion = this.apiVersion;
        this.requestUpdate(state.data);
        const response = await submitDetails(state.data);
        this.addResponse(response);
        dropin.setStatus("loading");
        if (response.action) {
            dropin.handleAction(response.action);
        } else if (response.resultCode === "Authorised") {
            dropin.unmount();
            document.getElementById('componentDiv').innerHTML = "";
            document.getElementById('componentDiv').innerHTML = '<div class="adyen-checkout__status adyen-checkout__status--success"><img height="88" class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/success.gif" alt="Payment successful!"><span class="adyen-checkout__status__text">Payment successful!</span></div>';
        } else if (response.resultCode !== "Authorised") {
            dropin.unmount();
            document.getElementById('componentDiv').innerHTML = "";
            document.getElementById('componentDiv').innerHTML = '<div class="adyen-checkout__status adyen-checkout__status--error"><img class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/error.gif" alt="Oops, try again please!" height="88"><span class="adyen-checkout__status__text">Oops, try again please!</span></div>';
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
    },
    onOrderCancel: (data) => {
        cancelOrder(data);
        checkout.update(paymentMethodsResponse, amount);
    },
    paymentMethodsConfiguration: {
        giftcard: {
            onBalanceCheck: async (resolve, reject, data) => {
                const balanceResponse = await balanceCheck(data);
                resolve(balanceResponse);
            },
            onOrderRequest: async (resolve, reject, data) => {
                const orderResponse = await createOrder(data);
                resolve(orderResponse);
            }
        }
    }
}

const optionalConfigurations = {
    amount: {
        value: value(),
        currency: currency()
    },
    showPayButton: true,
    style: {
        layout: "vertical",
        color: "blue"
    },
    countryCode: countryCode(),
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
    showBrandsUnderCardNumber: false,
    enableStoreDetails: true,
    hasHolderName:  component() == "ach" ? false : true,
    holderNameRequired:  component() == "ach" ? false : true,
    personalDetailsRequired: false,
    hideCVC: true,
    billingAddressRequired: component() == "ach" ? false : true,
    billingAddressMode: "partial",
    openFirstPaymentMethod: false,
    openFirstStoredPaymentMethod: false,
    showStoredPaymentMethods: false,
    showRemovePaymentMethodButton: true,
    showPaymentMethods: false,
    showEmailAddress: false,
    storePaymentMethod: true,
    visibility: {
        personalDetails: "hidden",
        billingAddress: "readOnly",
        deliveryAddress: "editable"
    },
    button: { 
        shape: 'semiround',
        theme: 'light',
        width: "full"
    },
    issuer: "d5d5b133-1c0d-4c08-b2be-3c9b116dc326",
    highlightedIssuers: ["d5d5b133-1c0d-4c08-b2be-3c9b116dc326", "ee9fc487-ebe0-486c-8101-17dce5141a67", "6765e225-a0dc-4481-9666-e26303d4f221", "8b0bfeea-fbb0-4337-b3a1-0e25c0f060fc"],
    placeholder: "somePlaceholder" 
}
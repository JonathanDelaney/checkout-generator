const App = {
    data(){
        return {
            loaded: false,
            flow: flow(),
            value: value(),
            currency: currency(),
            countryCode: countryCode(),
            overallRequest: paymentsDefaultConfig,
            additionalParams: additionalParams,
            component: component(),
            checkout: {},
            configuration: {},
            paymentMethodsResponse: {},
            countryList: countryList,
            currencyList: currencyList,
            componentList: componentList,
            sdkVersionList: sdkVersionList,
            apiVersionList: apiVersionList,
            mainEventList: mainEventList,
            componentEventList: [],
            state: {},
            componentList: componentList,
            mountedComponent: null,
            sdkVersion: sdkVersion(),
            apiVersion: apiVersion(),
            currentEndpoint: "/payments",
            mainSessionsConfiguration: {
                beforeSubmit:  (data, component, actions) => {
                    console.log(data, component);
                    actions.resolve(data);
                },
                onPaymentCompleted: (result, component) => {
                    console.log(result, component);
                    if (result.resultCode == "Authorised") {
                        setTimeout(() => {
                            document.getElementById('componentDiv').innerHTML = "";
                            document.getElementById('componentDiv').innerHTML = '<div class="adyen-checkout__status adyen-checkout__status--success"><img height="88" class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/success.gif" alt="Payment successful!"><span class="adyen-checkout__status__text">Payment successful!</span></div>';
                        }, 1)
                    } else {
                        setTimeout(() => {
                            document.getElementById('componentDiv').innerHTML = "";
                            document.getElementById('componentDiv').innerHTML = '<div class="adyen-checkout__status adyen-checkout__status--error"><img class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/error.gif" alt="Oops, try again please!" height="88"><span class="adyen-checkout__status__text">Oops, try again please!</span></div>'
                        }, 1)
                    }
                    this.addResponse(result);
                }
            },
            mainAdvancedConfiguration: {
                onSubmit: async (state, dropin) => {
                    this.requestUpdate(state.data);
                    const response =  await makePayment(this.overallRequest);
                    this.addResponse(response);
                    dropin.setStatus("loading");
                    if (response.action) {
                        dropin.handleAction(response.action);
                    } else if (response.order != null) {
                        this.checkout.update({order: response.order});
                    } else if (response.resultCode == "Authorised") {
                        dropin.unmount();
                        document.getElementById('componentDiv').innerHTML = "";
                        document.getElementById('componentDiv').innerHTML = '<div class="adyen-checkout__status adyen-checkout__status--success"><img height="88" class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/success.gif" alt="Payment successful!"><span class="adyen-checkout__status__text">Payment successful!</span></div>';
                    } else {
                        dropin.unmount();
                        document.getElementById('componentDiv').innerHTML = "";
                        document.getElementById('componentDiv').innerHTML = '<div class="adyen-checkout__status adyen-checkout__status--error"><img class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/error.gif" alt="Oops, try again please!" height="88"><span class="adyen-checkout__status__text">Oops, try again please!</span></div>';
                    }
                },
                onAdditionalDetails: async (state, dropin) => {
                    this.changeEndpoint("/payments/details");
                    this.requestUpdate(state.data);
                    const response = await submitDetails(state.data);
                    this.addResponse(response);
                    if (response.action) {
                        dropin.handleAction(response.action);
                    } else if (response.resultCode == "Authorised") {
                        document.getElementById('componentDiv').innerHTML = "";
                        document.getElementById('componentDiv').innerHTML = '<div class="adyen-checkout__status adyen-checkout__status--success"><img height="88" class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/success.gif" alt="Payment successful!"><span class="adyen-checkout__status__text">Payment successful!</span></div>';
                    } else {
                        document.getElementById('componentDiv').innerHTML = "";
                        document.getElementById('componentDiv').innerHTML = '<div class="adyen-checkout__status adyen-checkout__status--error"><img class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/error.gif" alt="Oops, try again please!" height="88"><span class="adyen-checkout__status__text">Oops, try again please!</span></div>';
                    }
                }
            },
            additionalMainEvents: {
                onChange: (state, component) => {
                    console.log(state, component);
                    this.requestUpdate(state.data);
                }
            },
            additionalComponentEvents: {
                onSelect: (activeComponent) => {
                    console.log(activeComponent.props.name);
                }
            },
            additionalComponentConfigurations: {},
            additionalEventString: ''
        }
    },
    computed: {
        componentConfigs: function () {
            const componentConfigs = {
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
    countryCode: "${this.countryCode}",
    amount: {
        currency: "${this.currency}",
        value: ${this.value}
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
    countryCode: "${this.countryCode}",
    amount: {
        currency: "${this.currency}",
        value: ${this.value}
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
            };
            return componentConfigs;
        },
        mainEventConfigs: function () {
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
                    } else if (response.order != null) {
                        this.checkout.update({order: response.order});
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
                    console.log(data);
                    this.overallRequest.amount.value = localStorage.getItem('value');
                    this.checkout.update({order: data, merchantAccount: this.overallRequest.merchantAccount});
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
                    },
                    applepay: {
                        amount: {
                            currency: this.currency,
                            value: this.value
                        },
                        countryCode: this.countryCode
                    }
                }
            }
            return mainEventConfigs;
        },
        componentEventConfigs: function () {
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
                onClick: this.component == "paypal" ? () => {
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
            return componentEventConfigs;
        },
        optionalConfigurations: function () {
            const optionalConfigurations = {
                amount: {
                    value: this.value,
                    currency: this.currency
                },
                showPayButton: true,
                style: {
                    layout: "vertical",
                    color: "blue"
                },
                countryCode: this.countryCode,
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
                hasHolderName:  this.component == "ach" ? false : true,
                holderNameRequired:  this.component == "ach" ? false : true,
                personalDetailsRequired: false,
                hideCVC: true,
                billingAddressRequired: this.component == "ach" ? false : true,
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
            return optionalConfigurations;
        },
        eventStrings: function () {
            let eventStrings = {
                beforeSubmit: `,
    beforeSubmit:  (data, dropin, actions) => {
        console.log(data);
        actions.resolve(data);
    }`,
                onSubmit: `,
    onSubmit: async (state, dropin) => {
        apiVersion = this.apiVersion
        const response =  await makePayment(state.data);${parseInt(localStorage.getItem("apiVersion")) < 67 ? setPaymentDataString : ''}
        dropin.setStatus("loading");
        if (response.action) {
            dropin.handleAction(response.action);
        } else if (response.resultCode === "Authorised") {
            dropin.setStatus("success", { message: "Payment successful!" });
        } else if (response.resultCode !== "Authorised") {
            dropin.setStatus("error", { message: "Oops, try again please!" });
        }
    }`,
                onAdditionalDetails: `,
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
    }`,
                onPaymentCompleted: `,
    onPaymentCompleted: (result, component) => {
        console.log(result, component);
    }`,
                onActionHandled: `,
    onActionHandled: (data) => {
        console.log(data, component)
    }`,
                onChange: `,
    onChange: (state, component) => {
        console.log(state, component);
    }`,
                onError: `,
    onError: (error, component) => {
        console.error(error, component);
    }`,
                onReady: `,
    onReady: () => {
        console.log("Component ready!")
    }`,
                onSelect: `onSelect: (activeComponent) => {
        console.log(activeComponent.props.name);
    }`,
                onAuthorized: `,
    onAuthorized: (resolve, reject, data) => {
        console.log(data);
        resolve();
    }`,
                onOrderCancel: `,
    onOrderCancel: (data) => {
        // Make a POST /orders/cancel request
        // Call the update function and pass the payment methods response to update the instance of checkout
        cancelOrder(data);
        checkout.update(paymentMethodsResponse, amount);
    }`,
                onBinLookup: `,
    onBinLookup: (binData) => {
        conosle.log(binData);
    }`,
                onBinValue: `,
    onBinValue: (binData) => {
        conosle.log(binData);
    }`,
                onBrand: `,
    onBrand: (brandData) => {
        conosle.log(brandData);
    }`,
                onFieldValid: `,
    onFieldValid: (fieldData) => {
        conosle.log(fieldData);
    }`,
                onLoad: `,
    onLoad: (obj) => {
        conosle.log(obj);
    }`,
                onConfigSuccess: `,
    onConfigSuccess: (obj) => {
        conosle.log(obj);
    }`,
                onFocus: `,
    onFocus: (obj) => {
        conosle.log(obj);
    }`,
                onShippingChange: `,
    onShippingChange: (data, actions) => {
        console.log(data);
        actions.resolve();
    }`,
                onInit: `,
    onInit: (data, actions) => {
        console.log(data);
        actions.enable();
    }`,
                onClick: this.component == "paypal" ? `,
    onClick: () => {
        console.log("Button clicked");
    }` : `,
    onClick: (resolve, reject) => {
        console.log('Button clicked');
        resolve();
    }`,
                onDisableStoredPaymentMethod: `,
    onDisableStoredPaymentMethod: async (storedPaymentMethodId, resolve, reject) => {
        const disableReq = {
            "shopperReference": shopperReference,
            "recurringDetailReference": storedPaymentMethodId
            }

        const disableRes = await cardDisable(disableReq)
        if (disableRes.response === "[detail-successfully-disabled]") {
            resolve();
        } else {
            reject();
        }
    }`,
                onBalanceCheck: `,
    onBalanceCheck: async (resolve, reject, data) => {
        // Make a POST /paymentMethods/balance request
        const balanceResponse = await balanceCheck(data);
        resolve(balanceResponse);
    }`,
                onOrderRequest: `,
    onOrderRequest: async (resolve, reject, data) => {
        // Make a POST /orders request
        // Create an order for the total transaction amount
        const orderResponse = await orderRequest(data);
        resolve(orderResponse);
    }`,
                paymentMethodsConfiguration: `,
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
        },
        applepay: {
            amount: {
                currency: ${this.currency},
                value: ${this.value}
            },
            countryCode: ${this.countryCode}
        }
    }`
            }
            return eventStrings;
        },
        configurationStrings: function () {
            const configurationStrings = {
                amount: `,
    amount: {
        value: ${this.value},
        currency: "${this.currency}"
    }`,
                showPayButton: `,
    showPayButton: true`,
                style: `,
    style: {
        layout: "vertical",
        color: "blue"
    }`,
                cspNonce: `,
    cspNonce: "nonceValue"`,
                enableMessages: `,
    enableMessages: true`,
                blockPayPalCreditButton: `,
    blockPayPalCreditButton: true`,
                blockPayPalPayLaterButton: `,
    blockPayPalPayLaterButton: true`,
                buttonType: `,
    buttonType: "CHECKOUT"`,
                buttonColor: `,
    buttonColor: "white"`,
                buttonSizeMode: `,
    buttonSizeMode: "long"`,
                emailRequired: `,
    emailRequired: true`,
                shippingAddressRequired: `,
    shippingAddressRequired: true`,
                shippingOptionRequired: `,
    shippingOptionRequired: true`,
                brands: `,
    brands: ["amex", "mc", "visa"]`,
                enableStoreDetails: `,
    enableStoreDetails: true`,
                hasHolderName:  this.component == "ach" ? `,
    hasHolderName: false` : `,
    hasHolderName: true`,
                holderNameRequired: this.component == "ach" ? `,
    holderNameRequired: false` : `,
    holderNameRequired: true`,
                hideCVC: `,
    hideCVC: true`,
                billingAddressRequired: this.component == "ach" ? `,
    billingAddressRequired: false` : `,
    billingAddressRequired: true`,
                billingAddressMode: `,
    billingAddressMode: "partial"`,
                openFirstPaymentMethod: `,
    openFirstPaymentMethod: false`,
                openFirstStoredPaymentMethod: `,
    openFirstStoredPaymentMethod: false`,
                showStoredPaymentMethods: `,
    showStoredPaymentMethods: false`,
                showRemovePaymentMethodButton: `,
    showRemovePaymentMethodButton: true`,
                showPaymentMethods: `,
    showPaymentMethods: false`,
                visibility: `,
    visibility: {
        personalDetails: "hidden", // These fields will not appear on the payment form.
        billingAddress: "readOnly", // These fields will appear on the payment form,
                                    //but the shopper can't edit them.
        deliveryAddress: "editable" // These fields will appear on the payment form,
                                    // and the shopper can edit them.
                                    // This is the default behavior.
    }`
            };
            return configurationStrings;
        },
        sdkVersionForList: function () {
            const newSdkVersionList = sdkVersionList.slice(0);
            const index = newSdkVersionList.indexOf(this.sdkVersion);
            const x = newSdkVersionList.splice(index, 1)
            return newSdkVersionList;
        },
        apiVersionForList: function () {
            const newApiVersionList = apiVersionList.slice(0);
            const index = newApiVersionList.indexOf(this.apiVersion);
            const x = newApiVersionList.splice(index, 1)
            return newApiVersionList;
        },
        componentForList: function () {
            const newComponentList = componentList.slice(0);
            const index = newComponentList.indexOf(this.component);
            const x = newComponentList.splice(index, 1)
            return newComponentList;
        },
        componentEvents: function () {
            return this.componentConfigs[this.component].events;
        },
        componentConfigurations: function () {
            return this.componentConfigs[this.component].optConfigurations;
        },
        requestSansVersion: function () {
            let requestSansVersion = {...this.overallRequest};
            delete requestSansVersion.version;
            if (this.flow == "sessions") {
                delete requestSansVersion.paymentMethod
                delete requestSansVersion.browserInfo
                delete requestSansVersion.origin
            }
            return requestSansVersion;
        },
        requestList: function () {
            let requestList = [];
            for (const [key, value] of Object.entries(this.overallRequest)) {
                requestList.push(key);
            }
            return requestList;
        },
        sessionRequest: function () {
            let sessionRequest = {...this.overallRequest};
            if (this.state != {}) {
                for (const [key, value] of Object.entries(this.state)) {
                    delete sessionRequest[key];
                }
            }
            return sessionRequest;
        },
        paramValueList: function () {
            let valueList = [];
            for (const [key, value] of Object.entries(this.overallRequest)) {
                requestList.push(value);
            }
            return valueList;
        },
        mainEventStrings: function () {
            let additionalEventString = this.additionalEventString;
            for (const [event, value] of Object.entries(this.additionalMainEvents)) {
                additionalEventString += this.eventStrings[event];
            }
            return additionalEventString;
        },
        componentEventStrings: function () {
            let componentEventString = '';
            for (const [event, value] of Object.entries(this.additionalComponentEvents)) {
                componentEventString += this.eventStrings[event];
            }
            return componentEventString;
        },
        componentConfigurationStrings: function () {
            let componentConfigurationString = '';
            for (const [config, value] of Object.entries(this.additionalComponentConfigurations)) {
                componentConfigurationString += this.configurationStrings[config];
            }
            return componentConfigurationString;
        },
        capFirstLetterComponent: function () {
            return this.component.charAt(0).toUpperCase() + this.component.slice(1);
        },
        essentialConfigs: function () {
            const essentialConfigs = {};
            const essentialConfigArray = this.componentConfigs[this.component].mustConfigurations;
            essentialConfigArray.forEach((config) => {
                essentialConfigs[config] = this.optionalConfigurations[config]
            })
            return essentialConfigs
        }
    },
    methods: {
        async createComponent() {
            this.setAdditionalParams();
            this.requestUpdate();
            document.getElementById('response').innerText = "";
            document.getElementById('componentDiv').innerHTML = "";
            const componentConfig = {...this.essentialConfigs, ...this.additionalComponentEvents, ...this.additionalComponentConfigurations};
            // Add embedded SDK tags
            document.head.innerHTML = document.head.innerHTML + '<link rel="stylesheet" href="https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/'+this.sdkVersion+'/adyen.css"/>';
            var scriptElm = document.createElement('script');
            scriptElm.src = 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/'+this.sdkVersion+'/adyen.js';
            const scriptPar = document.getElementById("app");
            scriptPar.parentNode.insertBefore(scriptElm, scriptPar.nextSibling);
            if (this.mountedComponent) {
                this.mountedComponent.unmount();
            }
            const clientKey = await getClientKey();
            if (parseInt(this.sdkVersion[0]) >= 5 && parseInt(this.apiVersion) > 67 && this.flow == "sessions") {
                let checkout = null;
                this.changeEndpoint("/sessions");
                const session  = await getSession(this.sessionRequest);
                this.configuration = {
                    clientKey: clientKey,
                    session,
                    environment: "test",
                    amount: {
                        currency: this.currency,
                        value: this.value
                    },
                    countryCode: this.countryCode,
                    ...this.mainSessionsConfiguration,
                    ...this.additionalMainEvents
                };
                this.checkout = await AdyenCheckout(this.configuration);
                this.mountedComponent = this.checkout.create(this.component, componentConfig).mount("#componentDiv");
            } else if (parseInt(this.sdkVersion[0]) >= 5 && parseInt(this.apiVersion) > 67 && this.flow == "advanced") {
                let checkout = null;
                this.changeEndpoint("/payments");
                paymentMethodsConfig.amount = {
                    currency: this.currency,
                    value: this.value
                };
                paymentMethodsConfig.countryCode = this.countryCode;
                this.paymentMethodsResponse  = await getPaymentMethods();
                this.configuration = {
                    clientKey: clientKey,
                    paymentMethodsResponse: this.paymentMethodsResponse,
                    environment: "test",
                    amount: {
                        currency: this.currency,
                        value: this.value
                    },
                    countryCode: this.countryCode,
                    ...this.mainAdvancedConfiguration,
                    ...this.additionalMainEvents
                };
                this.checkout = await AdyenCheckout(this.configuration);
                this.mountedComponent = this.checkout.create(this.component, componentConfig).mount("#componentDiv");
            } else if (parseInt(this.sdkVersion[0]) < 5 && parseInt(this.apiVersion) < 68 && this.flow == "advanced") {
                let checkout = null;
                this.changeEndpoint("/payments");
                const paymentMethodsResponse  = await getPaymentMethods();
                this.configuration = {
                    clientKey: clientKey,
                    paymentMethodsResponse,
                    environment: "test",
                    amount: {
                        currency: this.currency,
                        value: this.value
                    },
                    countryCode: this.countryCode,
                    ...this.mainAdvancedConfiguration,
                    ...this.additionalMainEvents
                };
                this.checkout = new AdyenCheckout(this.configuration);
                this.mountedComponent = this.checkout.create(this.component, componentConfig).mount("#componentDiv");
            } else (
                alert("!! VERSION MISMATCH !!")
            )

            document.getElementById('configuration').textContent =
            `
const configuration = {
    clientKey: "your_test_clientkey",
    environment: "test",,
    amount: {
        value: ${this.value},
        currency: "${this.currency}"
    },
    countryCode: "${this.countryCode}",
    ${this.flow === 'sessions' ? sessionsEvents : advancedEvents}${this.mainEventStrings}
};

const checkout = ${this.apiVersion <= 67 ? 'new' : 'await'} AdyenCheckout(configuration);
checkout.create('${ this.component }', {
    ${this.componentEventStrings}${this.componentConfigurationStrings}${this.componentConfigs[this.component].strings.essential}
}).mount("#componentDiv");
`
        },
        componentConfigurationChange(e, config) {
            e.target.classList.toggle('active');
            if (this.additionalComponentConfigurations[config] !== undefined) {
                delete this.additionalComponentConfigurations[config];
            } else {
                this.additionalComponentConfigurations[config] = this.optionalConfigurations[config];
            };
            this.createComponent();
        },
        componentEventChange(e, event) {
            e.target.classList.toggle('active');
            if (this.additionalComponentEvents[event]) {
                delete this.additionalComponentEvents[event];
            } else {
                this.additionalComponentEvents[event] = this.componentEventConfigs[event];
            };
            this.createComponent();
        },
        mainEventChange(e, event) {
            e.target.classList.toggle('active');
            if (this.additionalMainEvents[event]) {
                delete this.additionalMainEvents[event];
            } else {
                this.additionalMainEvents[event] = this.mainEventConfigs[event];
            };
            this.createComponent();
        },
        async addResponse(response) {
            const responseText = JSON.stringify(response, null, 4);
            document.getElementById('response').innerText = responseText;
        },
        async resetMainEvents() {
            this.additionalMainEvents = {
                onChange: (state, component) => {
                    console.log(state, component);
                    this.requestUpdate(state.data);
                }
            }
            const listEls = document.querySelectorAll('.main-config-list');
            listEls.forEach(item => {
                if (document.querySelector('.main-config-list.active') != null) {
                    document.querySelector('.main-config-list.active').classList.remove('active');  
                }
            })

        },
        requestUpdate(data) {
            if (data && "details" in data) {
                let tempRequest = {...data}
                document.getElementById('request').innerText = JSON.stringify(tempRequest, null, 2);
            } else if (data) {
                this.state = {...data};
                this.overallRequest = {...this.state, ...this.sessionRequest};
                document.getElementById('request').innerText = JSON.stringify(this.requestSansVersion, null, 2);
            } else {
                document.getElementById('request').innerText = JSON.stringify(this.requestSansVersion, null, 2);
            };
            this.resizeInputs();
        },
        changeRequestParams(e, param) {
            e.target.classList.toggle('active');
            if (this.overallRequest[param] !== undefined) {
                delete this.overallRequest[param];
            } else {
                this.overallRequest[param] = this.additionalParams[param];
            };
            this.requestUpdate();
        },
        resetComponentConfigs() {
            this.additionalComponentConfigurations = {}
            this.additionalComponentEvents = {
                onSelect: (activeComponent) => {
                    console.log(activeComponent.props.name);
                }
            }
            const listEls = document.querySelectorAll('.config-item');
            listEls.forEach(item => {
                if (document.querySelector('.config-item.active') != null) {
                    document.querySelector('.config-item.active').classList.remove('active');  
                }
            })
        },
        setAdditionalParams() {
            const listEls = document.querySelectorAll('.additionalParam');
            listEls.forEach(item => {
                item.classList
                if (item.classList.contains('active') != null && this.overallRequest[item.id] == undefined) {
                    item.classList.remove('active');  
                }
            })
        },
        resizeInputs() {
            function resizeInput() {
                this.style.width = `calc(${this.value.length - 2}ch + 50px)`;
            }
            var inputs = document.querySelectorAll('.request-input');
            inputs.forEach(input => {
                input.addEventListener('input', resizeInput);
                input.style.width = `calc(${input.value.length - 2}ch + 50px)`;
            });
        },
        async copy(event, idName) {
            var copyText = document.getElementById(idName);
            navigator.clipboard.writeText(copyText.innerText).then(() => {
                let target = event.target;
                target.src="https://static.thenounproject.com/png/5176860-200.png";
                target.classList.add("green");
                setTimeout(() => {
                    target.src="https://cdn-icons-png.flaticon.com/512/4855/4855025.png";
                    target.classList.remove("green");
                },500);
              }).catch(() => {
                alert("something went wrong");
              });
        },
        setCountry(e) {
            this.countryCode = e.target.value;
            paymentMethodsConfig.countryCode = this.countryCode;
            paymentsDefaultConfig.countryCode = this.countryCode;
            localStorage.setItem("countryCode", this.countryCode);
        },
        setCurrency(e) {
            this.currency = e.target.value;
            paymentMethodsConfig.amount.currency = this.currency;
            paymentsDefaultConfig.amount.currency = this.currency;
            localStorage.setItem("currency", this.currency);
        },
        setValue(e) {
            this.value = e.target.value;
            paymentMethodsConfig.amount.value = this.value;
            paymentsDefaultConfig.amount.value = this.value;
            localStorage.setItem("value", this.value);
        },
        setAPIVersion(e) {
            this.apiVersion = e.target.value;
            paymentMethodsConfig.version = this.apiVersion;
            paymentsDefaultConfig.version = this.apiVersion;
            localStorage.setItem("apiVersion", this.apiVersion);
        },
        setSDKVersion(e) {
            this.sdkVersion = e.target.value;
            localStorage.setItem("sdkVersion", this.sdkVersion);
        },
        setComponent(e) {
            this.component = e.target.value;
            localStorage.setItem("component", this.component);
            this.resetComponentConfigs();
        },
        setFlow(flow) {
            this.flow = flow;
            localStorage.setItem("flow", this.flow);
        },
        changeEndpoint(endpoint) {
            this.currentEndpoint = endpoint;
            const endEl = document.getElementById("endpoint");
            endEl.innerText = `to ${this.currentEndpoint} endpoint`
        }
    },
    async mounted() {
        this.resizeInputs();
        this.loaded = true;
    }
}

Vue.createApp(App).mount('#app')
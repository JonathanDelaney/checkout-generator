const sessionsEvents =`session, // Object containing id and sessionData from /sessions response
    beforeSubmit:  (data, dropin, actions) => {
        console.log(data);
        actions.resolve(data);
    },
    onPaymentCompleted: (result, component) => {
        console.log(result, component);
    }`

const redirectResultSessionsString =`
const queryResultString = window.location.search;
const urlParams = new URLSearchParams(queryResultString);
const redirectResult = urlParams.get("redirectResult");
const sessionId = urlParams.get("sessionId");
const handleSessionRedirect = async (redirectResult, sessionId) => {
    const clientKey = await getClientKey();
    const configuration = {
        environment: "test",
        clientKey: clientKey,
        session: {
            id: sessionId
        },
        onPaymentCompleted: (result, dropin) => {
            dropin.setStatus("success")
        },
        onError: (error, component) => {
            console.error(error.name, error.message, error.stack, component);
    }
    };
    const checkout = await AdyenCheckout(configuration);
    const dropin = checkout
    .create("dropin", {
        setStatusAutomatically: false
    })
    .mount("#componentDiv");
    checkout.submitDetails({ details: { redirectResult } });
}

if (redirectResult && sessionId) {
    handleSessionRedirect(redirectResult, sessionId);
}`

const getPaymentDataString = `
const paymentData = localStorage.getItem("paymentData");`

let redirectResultString =`
const queryResultString = window.location.search;
const urlParams = new URLSearchParams(queryResultString);
const redirectResult = urlParams.get("redirectResult");${parseInt(localStorage.getItem("apiVersion")) < 67 ? getPaymentDataString : ''}
const handleRedirect = async (redirectResult) => {
    const clientKey = await getClientKey();
    const checkout = await AdyenCheckout({
        environment: "test",
        clientKey: clientKey
    });
    const dropin = checkout
        .create("dropin", {
        setStatusAutomatically: false
        })
        .mount("#componentDiv");
    const response = await submitDetails({ details: { redirectResult }${parseInt(localStorage.getItem("apiVersion")) < 67 ? ', paymentData' : ''} });
    this.addResponse(response);
    if (response.resultCode === "Authorised") {
        dropin.setStatus("success", { message: "Payment successful!" });
    } else if (response.resultCode !== "Authorised") {
        dropin.setStatus("error", { message: "Oops, try again please!" });
    }
}

if (redirectResult) {
    handleRedirect(redirectResult);
}`

const MDParesString =`
const queryResultString = window.location.search;
const urlParams = new URLSearchParams(queryResultString);
const MD = urlParams.get("MD");
const PaRes = urlParams.get("PaRes");
const handleMDPaRes = async (MD, PaRes) => {
    const clientKey = await getClientKey();
    const checkout = await AdyenCheckout({
        environment: "test",
        clientKey: clientKey
    });
    const dropin = checkout
        .create("dropin", {
        setStatusAutomatically: false
        })
        .mount("#componentDiv");
    const response = await submitDetails({ details: { MD, PaRes }, paymentData });
    this.addResponse(response);
    if (response.resultCode === "Authorised") {
        dropin.setStatus("success", { message: "Payment successful!" });
    } else if (response.resultCode !== "Authorised") {
        dropin.setStatus("error", { message: "Oops, try again please!" });
    }
}

if (MD && PaRes) {
    handleMDPaRes(MD, PaRes);
}`

const payloadString =`
const queryResultString = window.location.search;
const urlParams = new URLSearchParams(queryResultString);
const payload = urlParams.get("payload");
const handlePayload = async (payload) => {
    const clientKey = await getClientKey();
    const checkout = await AdyenCheckout({
        environment: "test",
        clientKey: clientKey
    });
    const dropin = checkout
        .create("dropin", {
        setStatusAutomatically: false
        })
        .mount("#componentDiv");
    const response = await submitDetails({ details: { payload }, paymentData });
    this.addResponse(response);
    if (response.resultCode === "Authorised") {
        dropin.setStatus("success", { message: "Payment successful!" });
    } else if (response.resultCode !== "Authorised") {
        dropin.setStatus("error", { message: "Oops, try again please!" });
    }
}

if (payload) {
    handleMDPaRes(payload);
}`

const amazonCheckoutSessionIdString = `
const queryResultString = window.location.search;
const urlParams = new URLSearchParams(queryResultString);
const amazonCheckoutSessionId = urlParams.get("amazonCheckoutSessionId");
async handleSecondAmazonRedirect(amazonCheckoutSessionId) {
    const clientKey = await getClientKey(this.component);
    const checkout = await AdyenCheckout({
    environment: "test",
    clientKey: clientKey 
    });
    const amazonPayComponent = checkout
    .create('amazonpay', {
        showOrderButton: false,
        amount: {
            value: ${value()},
            currency: "${currency()}"
        },
        region: "UK",
        amazonCheckoutSessionId: amazonCheckoutSessionId,
        returnUrl: "https://checkout-generator-4bd984f9651f.herokuapp.com/returnUrl",
        showChangePaymentDetailsButton: false,
        onSubmit: async (state, component) => {
            const response = await makePayment(state.data);
            if (response.action) {
                // Handle additional action (3D Secure / redirect / other)
                component.handleAction(response.action);
            } else if (response.resultCode == "Authorised") {
                document.getElementById('componentDiv').innerHTML = '<div class="adyen-checkout__status adyen-checkout__status--success"><img height="88" class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/success.gif" alt="Payment successful!"><span class="adyen-checkout__status__text">Payment successful!</span></div>';
            } else {
                document.getElementById('componentDiv').innerHTML = '<div class="adyen-checkout__status adyen-checkout__status--error"><img class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/error.gif" alt="Oops, try again please!" height="88"><span class="adyen-checkout__status__text">Oops, try again please!</span></div>'
            }
        },
        onAdditionalDetails: (state, component) => {
            submitDetails(state.data).then(response => {
                if (response.action) {
                    // Handle additional action (3D Secure / redirect / other)
                    component.handleAction(response.action);
                } else if (response.resultCode == "Authorised") {
                    document.getElementById('componentDiv').innerHTML = '<div class="adyen-checkout__status adyen-checkout__status--success"><img height="88" class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/success.gif" alt="Payment successful!"><span class="adyen-checkout__status__text">Payment successful!</span></div>';
                } else {
                    document.getElementById('componentDiv').innerHTML = '<div class="adyen-checkout__status adyen-checkout__status--error"><img class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/error.gif" alt="Oops, try again please!" height="88"><span class="adyen-checkout__status__text">Oops, try again please!</span></div>'
                }
            })
        }      
    })
    .mount('#componentDiv');

    amazonPayComponent.submit();
}`

const setPaymentDataString = `
        const paymentData = localStorage.getItem("paymentData", response.paymentData);`

let advancedEvents = `paymentMethodsResponse, //  /paymentMethods response object
    onSubmit: async (state, dropin) => {
        const response =  await makePayment(state.data);${parseInt(localStorage.getItem("apiVersion")) < 67 ? setPaymentDataString : ''}
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
    }`


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
        console.log(binData);
    }`,
    onBinValue: `,
    onBinValue: (binData) => {
        console.log(binData);
    }`,
    onBrand: `,
    onBrand: (brandData) => {
        console.log(brandData);
    }`,
    onFieldValid: `,
    onFieldValid: (fieldData) => {
        console.log(fieldData);
    }`,
    onLoad: `,
    onLoad: (obj) => {
        console.log(obj);
    }`,
    onConfigSuccess: `,
    onConfigSuccess: (obj) => {
        console.log(obj);
    }`,
    onFocus: `,
    onFocus: (obj) => {
        console.log(obj);
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
    onClick: component == "paypal" ? `,
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
                currency: ${currency()},
                value: ${value()}
            },
            countryCode: ${countryCode()}
        }
    }`
}


const configurationStrings = {
    amount: `,
    amount: {
        value: ${value()},
        currency: "${currency()}"
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
    hasHolderName:  component() == "ach" ? `,
    hasHolderName: false` : `,
    hasHolderName: true`,
    holderNameRequired: component() == "ach" ? `,
    holderNameRequired: false` : `,
    holderNameRequired: true`,
    hideCVC: `,
    hideCVC: true`,
    billingAddressRequired: component() == "ach" ? `,
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
}
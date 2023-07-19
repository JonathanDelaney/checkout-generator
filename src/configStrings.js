const sessionsEvents =`session, // Object containing id and sessionData from /sessions response
    beforeSubmit:  (data, dropin, actions) => {
        console.log(data);
        actions.resolve(data);
    }
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

const sessionsRedirectConfigString = ``

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
    onClick: `,
    onClick: () => {
        console.log("Clicked");
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
    }`
}


const configurationStrings = {
    amount: `,
    amount: {
        value: 4900,
        currency: "EUR"
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
    hasHolderName: `,
    hasHolderName: true`,
    holderNameRequired: `,
    holderNameRequired: true`,
    hideCVC: `,
    hideCVC: true`,
    billingAddressRequired: `,
    billingAddressRequired: true`,
    billingAddressMode: `,
    billingAddressMode: "full"`,
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
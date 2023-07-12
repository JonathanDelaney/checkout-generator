const returnApp = {
    data(){
        return {
        }
    },
    computed: {
    },
    methods: {
        async handleSessionRedirect(redirectResult, sessionId) {
            const clientKey = await getClientKey();
            const configuration = {
                environment: "test",
                clientKey: clientKey,
                session: {
                    id: sessionId
                },
                onPaymentCompleted: (result, dropin) => {
                    this.addResponse(result);
                    if (result.resultCode == "Authorised") {
                        document.getElementById('componentDiv').innerHTML = '<div class="adyen-checkout__status adyen-checkout__status--success"><img height="88" class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/success.gif" alt="Payment successful!"><span class="adyen-checkout__status__text">Payment successful!</span></div>';
                    } else {
                        document.getElementById('componentDiv').innerHTML = '<div class="adyen-checkout__status adyen-checkout__status--error"><img class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/error.gif" alt="Oops, try again please!" height="88"><span class="adyen-checkout__status__text">Oops, try again please!</span></div>'
                    }
                },
                onError: (error, component) => {
                    console.error(error.name, error.message, error.stack, component);
                }
            };
            const checkout = await AdyenCheckout(configuration);
            const dropin = checkout
              .create("dropin", {
                setStatusAutomatically: true
              })
            checkout.submitDetails({ details: { redirectResult } });
        },
        async handleRedirect(redirectResult) {
            const apiVersion = parseInt(localStorage.getItem("apiVersion"));
            const paymentData = localStorage.getItem("paymentData");
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
            let payload = {}
            if (redirectResult && apiVersion < 67) {
                payload = { details: { redirectResult }, paymentData }
            } else {
                payload = { details: { redirectResult }}
            }
            const response = await submitDetails(payload);
            this.addResponse(response);
            if (response.resultCode === "Authorised") {
                dropin.setStatus("success", { message: "Payment successful!" });
            } else if (response.resultCode !== "Authorised") {
                dropin.setStatus("error", { message: "Oops, try again please!" });
            }
        },
        async handleRedirectMDPaRes(MD, PaRes) {
            const paymentData = localStorage.getItem("paymentData");
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
        },
        requestUpdate: (redirectResult, PaRes) => {
            const paymentData = localStorage.getItem("paymentData");
            const apiVersion = parseInt(localStorage.getItem("apiVersion"));
            let requestText = {};
            if (PaRes) {
                requestText = { details: { MD, PaRes }, paymentData };
            } else if (redirectResult && apiVersion < 67) {
                requestText = { details: { redirectResult }, paymentData };
            } else {
                requestText = { details: { redirectResult } };
            }
            document.getElementById('request').innerText = JSON.stringify(requestText, null, 2);
        },
        async addResponse(response) {
            const responseText = JSON.stringify(response, null, 4);
            document.getElementById('response').innerText = responseText;
        },
        async copy(idName) {
            var copyText = document.getElementById(idName);
            navigator.clipboard.writeText(copyText.innerText).then(() => {
                alert("Successfully copied");
              }).catch(() => {
                alert("something went wrong");
              });
        }
    },
    mounted() {
        const queryResultString = window.location.search;
        const urlParams = new URLSearchParams(queryResultString);
        const redirectResult = urlParams.get("redirectResult");
        const sessionId = urlParams.get("sessionId");
        const MD = urlParams.get("MD");
        const PaRes = urlParams.get("PaRes");
        if (redirectResult && sessionId) {
            document.getElementById('configuration').textContent = redirectResultSessionsString;
            this.requestUpdate(redirectResult)
            this.handleSessionRedirect(redirectResult, sessionId);
        } else if (redirectResult)  {
            document.getElementById('configuration').textContent = redirectResultString;
            this.requestUpdate(redirectResult)
            this.handleRedirect(redirectResult);
        } else if (MD && PaRes)  {
            document.getElementById('configuration').textContent = MDParesString;
            this.requestUpdate(MD, PaRes)
            this.handleRedirectMDPaRes(MD, PaRes);
        } else  {
            alert("No result data returned!")
        }
    },
}

Vue.createApp(returnApp).mount('#app')
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
            const response = await submitDetails({ details: { redirectResult } });
            this.addResponse(response);
            if (response.resultCode === "Authorised") {
                dropin.setStatus("success", { message: "Payment successful!" });
            } else if (response.resultCode !== "Authorised") {
                dropin.setStatus("error", { message: "Oops, try again please!" });
            }
        },
        requestUpdate: (redirectResult) => {
            let requestText = { details: { redirectResult } };
            document.getElementById('request').innerText = JSON.stringify(requestText, null, 2);
        },
        async addResponse(response) {
            const responseText = JSON.stringify(response, null, 4);
            document.getElementById('response').innerText = responseText;
        }
    },
    mounted() {
        const queryResultString = window.location.search;
        const urlParams = new URLSearchParams(queryResultString);
        const redirectResult = urlParams.get("redirectResult");
        const sessionId = urlParams.get("sessionId");
        if (redirectResult && sessionId) {
            document.getElementById('configuration').textContent = redirectResultSessionsString;
            this.requestUpdate(redirectResult)
            this.handleSessionRedirect(redirectResult, sessionId);
        } else if (redirectResult)  {
            document.getElementById('configuration').textContent = redirectResultString;
            this.requestUpdate(redirectResult)
            this.handleRedirect(redirectResult);
        } else  {
            alert("No redirectResult")
        }
    },
}

Vue.createApp(returnApp).mount('#app')
const App = {
    data(){
        return {
            componentConfigs: componentConfigs,
            flow: flow,
            countryList: countryList,
            currencyList: currencyList,
            componentList: componentList,
            sdkVersionList: sdkVersionList,
            apiVersionList: apiVersionList,
            mainEventList: mainEventList,
            componentEventList: [],
            state: {},
            overallRequest: paymentsDefaultConfig,
            additionalParams: additionalParams,
            component: component,
            componentList: componentList,
            mountedComponent: null,
            sdkVersion: sdkVersion,
            apiVersion: apiVersion,
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
                    } else if (response.resultCode == "Authorised") {
                        dropin.unmount();
                        document.getElementById('componentDiv').innerHTML = "";
                        document.getElementById('componentDiv').innerHTML = '<div class="adyen-checkout__status adyen-checkout__status--success"><img height="88" class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/success.gif" alt="Payment successful!"><span class="adyen-checkout__status__text">Payment successful!</span></div>';
                    } else {
                        dropin.unmount();
                        document.getElementById('componentDiv').innerHTML = "";
                        document.getElementById('componentDiv').innerHTML = '<div class="adyen-checkout__status adyen-checkout__status--error"><img class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/error.gif" alt="Oops, try again please!" height="88"><span class="adyen-checkout__status__text">Oops, try again please!</span></div>'
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
                        document.getElementById('componentDiv').innerHTML = '<div class="adyen-checkout__status adyen-checkout__status--error"><img class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/error.gif" alt="Oops, try again please!" height="88"><span class="adyen-checkout__status__text">Oops, try again please!</span></div>'
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
        // a computed getter
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
            return componentConfigs[this.component].events;
        },
        componentConfigurations: function () {
            return componentConfigs[this.component].optConfigurations;
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
                additionalEventString += eventStrings[event];
            }
            return additionalEventString;
        },
        componentEventStrings: function () {
            let componentEventString = '';
            for (const [event, value] of Object.entries(this.additionalComponentEvents)) {
                componentEventString += eventStrings[event];
            }
            return componentEventString;
        },
        componentConfigurationStrings: function () {
            let componentConfigurationString = '';
            for (const [config, value] of Object.entries(this.additionalComponentConfigurations)) {
                componentConfigurationString += configurationStrings[config];
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
                essentialConfigs[config] = optionalConfigurations[config]
            })
            return essentialConfigs
        }
    },
    methods: {
        async createComponent() {
            this.overallRequest = paymentsDefaultConfig;
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
                const configuration = {
                    clientKey: clientKey,
                    session,
                    environment: "test",
                    amount: this.overallRequest.amount,
                    ...this.mainSessionsConfiguration,
                    ...this.additionalMainEvents
                };
                checkout = await AdyenCheckout(configuration);
                this.mountedComponent = checkout.create(this.component, componentConfig).mount("#componentDiv");
            } else if (parseInt(this.sdkVersion[0]) >= 5 && parseInt(this.apiVersion) > 67 && this.flow == "advanced") {
                let checkout = null;
                this.changeEndpoint("/payments");
                paymentMethodsConfig.amount = this.overallRequest.amount;
                paymentMethodsConfig.countryCode = this.overallRequest.countryCode;
                const paymentMethodsResponse  = await getPaymentMethods();
                const configuration = {
                    clientKey: clientKey,
                    paymentMethodsResponse: paymentMethodsResponse,
                    environment: "test",
                    amount: this.overallRequest.amount,
                    ...this.mainAdvancedConfiguration,
                    ...this.additionalMainEvents
                };
                checkout = await AdyenCheckout(configuration);
                this.mountedComponent = checkout.create(this.component, componentConfig).mount("#componentDiv");
            } else if (parseInt(this.sdkVersion[0]) < 5 && parseInt(this.apiVersion) < 68 && this.flow == "advanced") {
                let checkout = null;
                this.changeEndpoint("/payments");
                const paymentMethodsResponse  = await getPaymentMethods();
                const configuration = {
                    clientKey: clientKey,
                    paymentMethodsResponse,
                    environment: "test",
                    amount: this.overallRequest.amount,
                    ...this.mainAdvancedConfiguration,
                    ...this.additionalMainEvents
                };
                checkout = new AdyenCheckout(configuration);
                this.mountedComponent = checkout.create(this.component, componentConfig).mount("#componentDiv");
            } else (
                alert("!! VERSION MISMATCH !!")
            )

            document.getElementById('configuration').textContent =
            `
const configuration = {
    clientKey: "your_test_clientkey",
    environment: "test",,
    amount: {
        value: ${amount.value},
        currency: "${amount.currency}"
    },
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
                this.additionalComponentConfigurations[config] = optionalConfigurations[config];
            };
            this.createComponent();
        },
        componentEventChange(e, event) {
            e.target.classList.toggle('active');
            if (this.additionalComponentEvents[event]) {
                delete this.additionalComponentEvents[event];
            } else {
                this.additionalComponentEvents[event] = componentEventConfigs[event];
            };
            this.createComponent();
        },
        mainEventChange(e, event) {
            e.target.classList.toggle('active');
            if (this.additionalMainEvents[event]) {
                delete this.additionalMainEvents[event];
            } else {
                this.additionalMainEvents[event] = mainEventConfigs[event];
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
            let countryCode = e.target.value;
            paymentMethodsConfig.countryCode = countryCode;
            paymentsDefaultConfig.countryCode = countryCode;
            localStorage.setItem("countryCode", countryCode);
        },
        setCurrency(e) {
            let currency = e.target.value;
            paymentMethodsConfig.amount.currency = currency;
            paymentsDefaultConfig.amount.currency = currency;
            localStorage.setItem("currency", currency);
        },
        setValue(e) {
            let value = e.target.value;
            paymentMethodsConfig.amount.value = value;
            paymentsDefaultConfig.amount.value = value;
            localStorage.setItem("value", value);
        },
        setAPIVersion(e) {
            apiVersion = e.target.value;
            paymentMethodsConfig.version = apiVersion;
            paymentsDefaultConfig.version = apiVersion;
            localStorage.setItem("apiVersion", apiVersion);
        },
        setSDKVersion(e) {
            sdkVersion = e.target.value;
            localStorage.setItem("sdkVersion", sdkVersion);
        },
        setComponent(e) {
            component = e.target.value;
            localStorage.setItem("component", component);
            this.resetComponentConfigs();
        },
        setFlow(flow) {
            localStorage.setItem("flow", flow);
        },
        changeEndpoint(endpoint) {
            this.currentEndpoint = endpoint;
            const endEl = document.getElementById("endpoint");
            endEl.innerText = `to ${this.currentEndpoint} endpoint`
        }
    },
    async mounted() {
        this.resizeInputs();
    }
}

Vue.createApp(App).mount('#app')
const App = {
    data(){
        return {
            componentConfigs: componentConfigs,
            flow: "advanced",
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
            component: "dropin",
            mountedComponent: null,
            sdkVersion: sdkVersionList[0],
            apiVersion: apiVersionList[0],
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
                    console.log(state);
                    this.requestUpdate(state.data);
                    console.log(this.overallRequest);
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
                    this.currentEndpoint= "/payments/details";
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
            return sdkVersionList.slice(1);
        },
        apiVersionForList: function () {
            return apiVersionList.slice(1);
        },
        componentForList: function () {
            return componentList.slice(1);
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
            return this.overallRequest;
        },
        requestList: function () {
            let requestList = [];
            for (const [key, value] of Object.entries(this.overallRequest)) {
                requestList.push(key);
            }
            return requestList;
        },
        sessionRequest: function () {
            console.log(this.overallRequest);
            let sessionRequest = {...this.overallRequest};
            if (this.state != {}) {
                console.log(this.state);
                for (const [key, value] of Object.entries(this.state)) {
                    delete sessionRequest[key];
                }
            }
            console.log(sessionRequest);
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
                console.log(this.sessionRequest);
                const session  = await getSession(this.sessionRequest);
                const configuration = {
                    clientKey: clientKey,
                    session,
                    environment: "test",
                    ...this.mainSessionsConfiguration,
                    ...this.additionalMainEvents
                };
                checkout = await AdyenCheckout(configuration);
                this.mountedComponent = checkout.create(this.component, componentConfig).mount("#componentDiv");
            } else if (parseInt(this.sdkVersion[0]) >= 5 && parseInt(this.apiVersion) > 67 && this.flow == "advanced") {
                let checkout = null;
                paymentMethodsConfig.amount = this.overallRequest.amount;
                paymentMethodsConfig.countryCode = this.overallRequest.countryCode;
                const paymentMethodsResponse  = await getPaymentMethods();
                const configuration = {
                    clientKey: clientKey,
                    paymentMethodsResponse: paymentMethodsResponse,
                    environment: "test",
                    amount: {
                        currency: "EUR",
                        value: 4900
                    },
                    ...this.mainAdvancedConfiguration,
                    ...this.additionalMainEvents
                };
                checkout = await AdyenCheckout(configuration);
                this.mountedComponent = checkout.create(this.component, componentConfig).mount("#componentDiv");
            } else if (parseInt(this.sdkVersion[0]) < 5 && parseInt(this.apiVersion) < 68 && this.flow == "advanced") {
                let checkout = null;
                const paymentMethodsResponse  = await getPaymentMethods();
                const configuration = {
                    clientKey: clientKey,
                    paymentMethodsResponse,
                    environment: "test",
                    amount: {
                        currency: "EUR",
                        value: 4900
                    },
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
    environment: "test",
    ${this.flow === 'sessions' ? sessionsEvents : advancedEvents}${this.mainEventStrings}
};

const checkout = ${this.apiVersion <= 67 ? 'new' : 'await'} AdyenCheckout(configuration);
checkout.create('${ this.component }', {
    ${this.componentConfigs[this.component].strings.essential}${this.componentEventStrings}${this.componentConfigurationStrings}
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
        requestUpdate(data) {
            if (data) {
                this.state = {...data};
            };
            this.overallRequest = data && "details" in data ? {...data} : {...this.state, ...this.sessionRequest};
            document.getElementById('request').innerText = JSON.stringify(this.requestSansVersion, null, 2);
        },
        async addResponse(response) {
            const responseText = JSON.stringify(response, null, 4);
            document.getElementById('response').innerText = responseText;
        },
        async resetMainEvents(flow) {
            this.additionalMainEvents = {
                onChange: (state, component) => {
                    console.log(state, component);
                    this.requestUpdate(state.data);
                }
            }
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
        }
    }
}

Vue.createApp(App).mount('#app')
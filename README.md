# Checkout Generator

![Checkout Generator](/screenshot.png)

> ⚠️ **This site is for internal Adyen use only**

## Requirements

To run this project, **create** a `.env` file on your project's root folder following the example on `.env.default`.

```
MERCHANT_ACCOUNT=MyMerchantAccount
CHECKOUT_APIKEY=MY_CHECKOUT_API_KEY
CLIENT_KEY=MY_CLIENT_KEY
```

These variables can be found in Adyen Customer Area. For more information, visit our [Get started with Adyen guide](https://docs.adyen.com/get-started-with-adyen#page-introduction).

To learn how to set up a sample integration generally, watch [this short video here](https://youtu.be/AcYl5X_xEyE).

## Installation

### The requisites

#### PHP

Make sure you have PHP installed by going to the Managed Software Center. You can check in the terminal by using this command:
```
$ php --version
```
You should get back something like
```
PHP 8.2.0 (cli) (built: Dec  9 2022 01:24:43) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.2.0, Copyright (c) Zend Technologies
```

#### Node

You could run an instance of this locally on a virtual machine using node. Most computers within Tech Support are restricted to PHP serving.

If you want to check if node is installed you can run
```
$ node -v
```

### Running the PHP Server

Navigate to the root of the project and run the `start.sh` script:

```
$ cd Checkout-Testing-Tool
$ ./start.sh
```

A PHP server will start on `http://localhost:3000`.

### Running the Node.js Server

To do this, navigate to the root of the project, install the dependencies (only the first time) and run the start script:

```
$ cd Checkout-Testing-Tool
$ npm i
$ npm start
```

A Node.js server will start on `http://localhost:3000`.

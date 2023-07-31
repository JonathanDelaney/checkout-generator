<?php
/**
 * Adyen Checkout Example (https://www.adyen.com/)
 * Copyright (c) 2019 Adyen BV (https://www.adyen.com/)
 */

require('api/paymentMethods.php');
require('api/disable.php');
require('api/orders.php');
require('api/ordersCancel.php');
require('api/balanceCheck.php');
require('api/payments.php');
require('api/originKeys.php');
require('api/clientKeys.php');
require('api/merchantAccount.php');
require('api/sessions.php');
require('api/paymentsDetails.php');

// Basic routing
$request_uri = explode('?', $_SERVER['REQUEST_URI'], 2);

switch($request_uri[0]) {
    // /paymentMethods
    case '/paymentMethods':
        header('Content-Type: application/json');
        echo getPaymentMethods();
        break;

    // /disable
    case '/disable':
        header('Content-Type: application/json');
        echo cardDisable();
        break;

    // /orders/cancel
    case '/orders/cancel':
        header('Content-Type: application/json');
        echo orderCancel();
        break;

    // /paymentMethods/balance
    case '/paymentMethods/balance':
        header('Content-Type: application/json');
        echo balanceCheck();
        break;

    // /orders
    case '/orders':
        header('Content-Type: application/json');
        echo order();
        break;

    // /payments
    case '/payments':
        header('Content-Type: application/json');
        echo initiatePayment();
        break;

    // /paymentsDetails
    case '/payments/details':
        header('Content-Type: application/json');
        echo submitDetails();
        break;


    // /originKeys
    case '/originKeys':
        header('Content-Type: application/json');
        echo getOriginKey();
        break;

    // /clientKeys (there is no API, this is a mock)
    case '/clientKeys':
        header('Content-Type: application/json');
        echo getClientKey();
        break;

    // /merchantAccount (there is no API, this is a mock)
    case '/merchantAccount':
        header('Content-Type: application/json');
        echo getMerchantAccount();
        break;

    // /sessions
    case '/sessions':
        header('Content-Type: application/json');
        echo initiateSessions();
        break;
    // default
    default:
        return false;

}

<?php
/**
 * Adyen Checkout Example (https://www.adyen.com/)
 * Copyright (c) 2019 Adyen BV (https://www.adyen.com/)
 */
function getClientKey() {
	// Retrieves the clientKey from the .env file
    if (file_get_contents('php://input') != '') {
        $request = json_decode(file_get_contents('php://input'), true);
    } else {
        $request = array();
    }

    if ($request != 'amazonpay') {
        $clientKey = getenv('CLIENT_KEY');
    } else {
        $clientKey = getenv('MARK_CLIENT_KEY');
    }

    $data = [
    	"clientKey" => $clientKey
    ];

    $result = json_encode($data);

    return $result;
}

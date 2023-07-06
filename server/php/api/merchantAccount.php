<?php
/**
 * Adyen Checkout Example (https://www.adyen.com/)
 * Copyright (c) 2019 Adyen BV (https://www.adyen.com/)
 */
function getMerchantAccount() {
	// Retrieves the merchantAccount from the .env file
    $merchantAccount = getenv('MERCHANT_ACCOUNT');

    $data = [
    	"merchantAccount" => $merchantAccount
    ];

    $result = json_encode($data);

    return $result;
}

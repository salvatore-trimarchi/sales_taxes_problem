<?php

/**
 * #################################
 * #      Database-like infos      #
 * #################################
 * 
 * tax config & shopping baskets
 */
$tax_config_folder			= '../resources/taxes';
$shopping_baskets_folder	= '../resources/shopping_baskets';
$shopping_baskets_files		= array_diff(scandir($shopping_baskets_folder),array('.', '..'));

/**
 * #################################
 * #        Endpoint MODE 1        #
 * #################################
 *
 * delivering shopping basket product list
 * (a basket is selected) 
 */
if($_GET && in_array('shopping_basket_selected', array_keys($_GET))) {
	// retrieving selected shopping basket name from query
	$basket_selected = $_GET['shopping_basket_selected'];
	// product list response
	if (in_array($basket_selected, $shopping_baskets_files)) {
		require $shopping_baskets_folder.'/'.$basket_selected;
		$resp = ['success',$products];
	} else {
		$resp = ['fail',[]];
	}
/**
 * #################################
 * #        Endpoint MODE 2        #
 * #################################
 * 
 * delivering shopping basket name list & tax config
 * (page init with basket select)
 */
} else {
	require $tax_config_folder.'/sales_taxes.php';
	require $tax_config_folder.'/no_basic_sales_tax_good_types.php';
	// database & configuration response
	$resp = [
		'shopping_baskets_files' 		=> $shopping_baskets_files,
		'sales_taxes' 					=> $sales_taxes,
		'no_basic_sales_tax_good_types' => $no_basic_sales_tax_good_types,
	];
}

header('Content-Type: application/json');
echo json_encode($resp);

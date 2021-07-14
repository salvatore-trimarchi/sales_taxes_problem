<?php

/**
 * 1 imported 	bottle of perfume 			at 27.99
 * 1 			bottle of perfume 			at 18.99
 * 1 			packet of headache pills 	at 9.75
 * 3 imported 	box of chocolates 			at 11.25
 */

$products = [
	[
		'name' 		=> 'bottle of perfume',
		'price' 	=> 27.99,
		'item_num' 	=> 1,
		'type'		=> 'personal care',
		'imported'	=> true
	],
	[
		'name' 		=> 'bottle of perfume',
		'price' 	=> 18.99,
		'item_num' 	=> 1,
		'type'		=> 'personal care',
		'imported'	=> false
	],
	[
		'name' 		=> 'packet of headache pills',
		'price' 	=> 9.75,
		'item_num' 	=> 1,
		'type'		=> 'medical product',
		'imported'	=> false
	],
	[
		'name' 		=> 'box of chocolates',
		'price' 	=> 11.25,
		'item_num' 	=> 3,
		'type'		=> 'food',
		'imported'	=> true
	],
];

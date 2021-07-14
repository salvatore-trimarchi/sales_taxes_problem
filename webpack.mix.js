let mix = require('laravel-mix');

mix
	.sass('resources/sass/main.scss','css/')
	.js('resources/js/main.js','js/')
	.setPublicPath('./')
	.disableSuccessNotifications();

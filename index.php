<!DOCTYPE html>
<html lang="en" dir="ltr">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<!-- [ FONTS ] -->
		<link rel="preconnect" href="https://fonts.gstatic.com">
		<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
		<!-- [ Vue.js + AXIOS ] -->
		<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.20.0/axios.min.js"></script>
		<!-- [ MAIN CSS ] -->
		<link rel="stylesheet" href="css/main.css">
		<!-- [ MAIN JS ] -->
		<script type="text/javascript" src="js/main.js" defer></script>
		<!----------------->
		<link rel="shortcut icon" href="#">
		<title>Sales Taxes Problem</title>
	</head>
	<body>
	
		<div id="app">

			<!-- HEADER: SHOPPING BASKET SELECTION -->
			<?php require __DIR__.'/partials/header.php'; ?>

			<!-- MAIN: RECEIPT CONTENT -->
			<?php require __DIR__.'/partials/main.php'; ?>

			<!-- FOOTER -->
			<?php require __DIR__.'/partials/footer.php'; ?>

		</div> <!-- Vue.js main instance #app -->

	</body>
</html>

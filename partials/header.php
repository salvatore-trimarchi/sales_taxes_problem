<header>
	<h3 class="logo">Sales Taxes Problem</h3>
	<div class="select_box">
		<label for="selection">Select your shopping basket</label>
		<select id="selection" v-model="basketSelected" @change="getData('products')">
			<option value="">none</option>
			<option v-for="basketFileName in basketFileNames" :value="basketFileName">{{ cap(basketFileName) }}</option>
		</select>
	</div>
</header>
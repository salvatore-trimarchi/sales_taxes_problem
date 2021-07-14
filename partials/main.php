<main>
	<div class="display_panel" v-if="basketSelected">
		<h2>Receipt for {{ cap(basketSelected) }}</h2>
		<div class="card">
			<div class="head">Items in your basket</div>
			<div class="table">
				<div class="tr tr-bottom-line txt_1">
					<div>item</div>
					<div>#</div>
					<div>unit price</div>
					<div>cost (tax incl.)</div>
					<div>taxes</div>
				</div>
				<div class="tr tr-bottom-line" v-for="basketProduct in basketProducts">
					<div>{{ cap(basketProduct.name) }} <span class="txt_3" v-if="basketProduct.imported">Imported</span></div>
					<div>{{ basketProduct.item_num }}</div>
					<div>€ {{ getItemPrice(basketProduct).unitPrice.toFixed(2)  }}</div>
					<div>€ {{ getItemPrice(basketProduct).itemAmount.toFixed(2) }}</div>
					<div>€ {{ getItemPrice(basketProduct).itemTaxes.toFixed(2)  }}</div>
				</div>
				<div class="tr tr-top-padding txt_2">
					<div></div>
					<div></div>
					<div>Totals</div>
					<div>€ {{ getTotals(basketProducts).totalAmount.toFixed(2) }}</div>
					<div>€ {{ getTotals(basketProducts).totalTaxes.toFixed(2)  }}</div>
				</div>
			</div>
		</div>
	</div>
</main>
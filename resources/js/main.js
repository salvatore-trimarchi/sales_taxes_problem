// ################################ 
// #    Vue.js - MAIN INSTANCE    # 
// ################################ 

var app = new Vue(
	{
		el: '#app',
		data: {
			basketSelected				: '',
			basketProducts				: [],
			basketFileNames				: [],
			salesTaxes					: [],
			noBasicSalesTaxGoodTypes	: [],
		},
		methods: {
			getData(_mode) {
				let wl = window.location, params = {};
				if (_mode == 'products') {
					params = {
						shopping_basket_selected: this.basketSelected,
					}
				}
				axios
					.get(wl.protocol+'//'+wl.host+wl.pathname+'partials/endpoint.php', {params})
					.then((resp) => {
						// MODE 1: retrieving shopping basket product list
						if (_mode == 'products') {
							if (resp.data[0] == 'success') {
								this.basketProducts = resp.data[1];
							} else {
								console.log('product list unavailable');
							}
						// MODE 2: retrieving shopping basket name list & tax config
						} else {
							this.basketFileNames = resp.data.shopping_baskets_files;
							this.salesTaxes = resp.data.sales_taxes;
							this.noBasicSalesTaxGoodTypes = resp.data.no_basic_sales_tax_good_types;
						}
					});
			},
			getItemPrice(_item) {
				let unitPrice 	  = _item.price,
					taxableAmount = _item.item_num * unitPrice,
					basicSalesTax = 0,
					importDutyTax = 0,
					itemAmount    = 0,
					itemTaxes	  = 0;
				// is basic sales tax applicable 
				if (!this.noBasicSalesTaxGoodTypes.includes(_item.type))
					basicSalesTax = taxableAmount * this.salesTaxes.basic_sales_tax.rate;
				// is import_duty applicable
				if (_item.imported)
					importDutyTax = taxableAmount * this.salesTaxes.import_duty.rate;
				// rounded taxes & item cost
				itemTaxes  = this.getTaxRoundingByRule(basicSalesTax + importDutyTax);
				itemAmount = (taxableAmount + itemTaxes);
				return {unitPrice, itemAmount, itemTaxes};
			},
			getTaxRoundingByRule(_value) {
				// The rounding rules for sales tax are that 
				// for a tax rate of n%, a shelf price of p contains
				// (np/100 rounded up to the nearest 0.05) amount of sales tax.
				// 0.05 => +/- 0.025 => round()
				ret = (Math.round(_value*20)/20);
				return ret;
			},
			getTotals(_items) {
				let totalAmount = 0,
					totalTaxes  = 0;
				_items.forEach((item) => {
					totalAmount += this.getItemPrice(item).itemAmount;
					totalTaxes  += this.getItemPrice(item).itemTaxes;
				});	
				return {totalAmount, totalTaxes};
			},
			cap(_string) {
				let str = _string.replace('.php', ''); // removing extension
				str = str.replace(/_/g, ' '); // underscore to space
				return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
					function(s){
						return s.toUpperCase();
					});
			},
		},
		created() {
			// MODE 2: retrieving shopping basket name list & tax config
			this.getData('config');
		}
	}
);

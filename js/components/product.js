Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: 'https://via.placeholder.com/200x150',
        }
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `<div class="products">
                    <product v-for="product of filtered" 
                        :key="product.id_product" 
                        :img="imgCatalog" 
                        :product="product">
                    </product>
                </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="product-item">
                <img :src="img" alt="img">
                <div class="product-description" >
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}} $</p>
                    <button class="buy-btn" 
                        @click="$parent.$parent.$refs.cart.addProduct(product)">
                        Купить</button>
                </div>
            </div>`
})
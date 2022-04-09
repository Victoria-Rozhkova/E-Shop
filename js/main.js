const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
        showCart: false,
        goods: [],
        basket: [],
        filteredGoods: [],
        imgGood: "https://via.placeholder.com/250x200",
        imgBasket: "https://via.placeholder.com/100x100",
        urlCatalog: '/catalogData.json',
        urlBasket: '/getBasket.json',
    },
    methods: {
        getJson(url) {
            return fetch(url).then(result => result.json()).catch(error => console.log(error));
        },
        addGood(item) {
            this.getJson(`${API}/addToBasket.json`).then(data => {
                if (data.result === 1) {
                    let find = this.basket.find(el => el.id_product === item.id_product);
                    if (find) {
                        find.quantity++;
                    } else {
                        const prod = Object.assign({
                            quantity: 1
                        }, item);
                        this.basket.push(prod)
                    }
                }
            })
        },
        delFromBasket(item) {
            this.getJson(`${API}/addToBasket.json`).then(data => {
                if (data.result === 1) {
                    if (item.quantity > 1) {
                        item.quantity--;
                    } else {
                        this.basket.splice(this.basket.indexOf(item), 1);
                    }
                }
            })
        },
        filter() {
            let regExp = new RegExp(this.userSearch, 'i');
            this.filteredGoods = this.goods.filter(el => regExp.test(el.product_name));
        }
    },
    mounted() {
        this.getJson(`${API + this.urlCatalog}`).then(catalogObject => {
            for (let item of catalogObject) {
                this.goods.push(item);
                this.filteredGoods.push(item);
            }
        });
        this.getJson(`${API + this.urlBasket}`).then(basketObject => {
            for (let item of basketObject.contents) {
                this.basket.push(item);
            }
        });
    }
});
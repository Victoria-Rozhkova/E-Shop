Vue.component("cart", {
  data() {
    return {
      imgCart: "https://via.placeholder.com/50x50",
      cartUrl: "/getBasket.json",
      cartItems: [],
      showCart: false,
    };
  },
  methods: {
    addProduct(product) {
      let find = this.cartItems.find(
        (el) => el.id_product === product.id_product
      );
      if (find) {
        this.$parent
          .putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
          .then((data) => {
            if (data.result === 1) {
              find.quantity++;
            }
          });
      } else {
        let prod = Object.assign(
          {
            quantity: 1,
          },
          product
        );
        this.$parent.postJson("/api/cart", prod).then((data) => {
          if (data.result === 1) {
            this.cartItems.push(prod);
          }
        });
      }
    },
    remove(item) {
      console.log(item);
      // this.$parent
      //   .putJson(`api/cart/${item.id_product}/${item.product_name}`)
      //   .then((data) => {
      //     console.log(data);
      //     if (data.result === 1) {
      //       if (item.quantity > 1) {
      //         item.quantity--;
      //       } else {
      //         this.$parent
      //           .delJson(
      //             `api/cart/${item.id_product}/${item.product_name}`,
      //             item
      //           )
      //           .then((data) => {
      //             if (data.result) {
      //               this.cartItems.splice(this.cartItems.indexOf(item), 1);
      //             } else {
      //               console.log("error");
      //             }
      //           });
      //       }
      //     }
      //   });
    },
  },
  mounted() {
    this.$parent.getJson("/api/cart").then((data) => {
      for (let el of data.contents) {
        el.img_product = `img/${el.id_product}.jpg`;
        this.cartItems.push(el);
      }
    });
  },
  template: `<div>
                    <button class="btn-cart" 
                    type="button" 
                    @click="showCart = !showCart">Корзина</button>
                    <div class="basket backet-click" v-show="showCart">
                    <p v-if="!cartItems.length">Корзина пуста :(</p>
                    <cart-item class="basket-item" 
                        v-for="item of cartItems" 
                        :key="item.id_product"
                        :cart-item = "item"
                        :img="imgCart"
                        @remove="remove">
                    </cart-item>
                    </div>
                </div>`,
});
Vue.component("cart-item", {
  props: ["cartItem", "img"],
  template: `<div class="basket-item">
                    <div class="cart-left" >
                        <img :src="img" alt="img">
                        <div>
                            <h3>{{cartItem.product_name}}</h3>
                            <p>{{cartItem.price}} &#8381;</p>
                        </div>
                    </div>
                    <div class="cart-right">
                        <p>{{cartItem.quantity}} шт.</p>
                        <p>{{cartItem.price * cartItem.quantity}} &#8381;</p>
                        <button class="delFromBasket" 
                        @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>`,
});

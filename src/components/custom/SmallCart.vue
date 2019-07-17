<template>
  <div>
    <loading :active.sync="isLoading"
             style="z-index:9999"></loading>
    <div class="dropdown">
      <a class="btn btn-cart btn-sm text-white"
         href="#"
         @click.prevent="show=!show">
        <div class="cart">
          <i class="fas fa-shopping-cart fa-2x"></i>
        </div>
        <span class="badge badge-pill badge-danger number">{{cartlength}}</span>
      </a>

      <div class="dropdown-menu mt-2 d-block"
           v-if="show">
        <div class="px-4 py-3">
          <div v-if="getProduct.length">
            <h5>已選擇商品</h5>
            <div class="table-reponsuve">
              <table class="table">
                <tbody>
                  <tr v-for="item in getProduct"
                      :key="item.id">
                    <td>
                      <button class="btn btn-outline-danger btn-sm"
                              data-toggle="modal"
                              data-target="#del"
                              @click="removeCart(item.id)"
                              :disabled="isdisabled">
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </td>
                    <td>{{item.product.title}}</td>
                    <td>{{item.qty}} {{item.product.unit}}</td>
                    <td class="text-right"
                        v-if="item.product.price">${{item.product.price*item.qty}}</td>
                    <td class="text-right"
                        v-else>${{item.product.origin_price*item.qty}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <router-link to="/cart"
                           class="btn btn-primary btn-block"><i class="fas fa-cart-arrow-down"></i>
                結帳去</router-link>
            </div>
          </div>
          <div v-else>
            <h5>無任何商品</h5>
            <router-link to="/products"
                         class="btn btn-danger btn-block"><i class="fas fa-cart-plus"></i>
              看商品</router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isdisabled: false,
      show: false,
      getProduct: [],
      isLoading: false
    }
  },
  computed: {
    cartlength () {
      return this.getProduct.length
    }
  },
  created () {
    //  建立時先取得購物車資料
    this.getCart()
    //  同層級元件監聽
    this.$getcart.$on('get', () => {
      this.getCart()
    })
  },
  beforeDestroy () {
    this.$getcart.$off('get', () => {
      this.getCart()
    })
  },
  methods: {
    getCart () {
      this.isdisabled = true
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.getProduct = response.data.data.carts
        }
        this.isdisabled = false
      })
    },
    removeCart (id) {
      this.isLoading = true
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
      this.$http.delete(api).then((response) => {
        if (response.data.success) {
          this.getCart()
          this.$bus.$emit('message:push', response.data.message + '商品', 'danger')
        }
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scope>
.table td {
  vertical-align: middle;
}
</style>

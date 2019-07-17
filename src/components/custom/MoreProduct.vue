<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <alert></alert>
    <section class="mt-3"
             v-if="Product">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-transparent px-0">
            <li class="breadcrumb-item">
              <router-link to="/">首頁</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/products">商品</router-link>
            </li>
            <li class="breadcrumb-item active"
                aria-current="page">{{Product.title}}</li>
          </ol>
        </nav>
        <div class="row">
          <div class="col-lg-4">
            <div class="sticky-top">
              <h1 class="h2">{{Product.title}}</h1>
              <div class="d-flex justify-content-end align-items-end">
                <del class="text-secondary"
                     v-if="Product.origin_price">原價 ${{Product.origin_price}}</del>
                <div class="ml-auto text-danger h3 mb-0"
                     v-if="!Product.origin_price">
                  <small>售價</small>
                  <strong>NT$ {{Product.price}}</strong>
                </div>
                <div class="ml-auto text-danger h3 mb-0"
                     v-if="Product.origin_price">
                  <small>特價</small>
                  <strong>NT$ {{Product.price}}</strong>
                </div>
              </div>
              <hr>

              <div class="input-group mb-3">
                <select class="form-control mr-2"
                        v-model="Product.num">
                  <option :value="item"
                          v-for="item in 10"
                          :key="item">{{item}}{{Product.unit}}</option>
                </select>
                <a href="#"
                   class="btn btn-primary"
                   @click.prevent="addCart(Product.id,Product.num)">
                  <i class="fas fa-spinner fa-spin"
                     v-if="addtoCartload"></i>
                  加入購物車</a>
              </div>
              <div v-if="Product.price"
                   class="text-right h5">總價:NT$ {{Product.num*Product.price}}</div>
              <div v-else
                   class="text-right h5">總價:NT$ {{Product.num*Product.origin_price}}</div>
            </div>
          </div>
          <div class="col-lg-8">
            <h2>夏天消暑必備</h2>
            <p>This is a longer card with supporting text below as a natural lead-in to additional content. This
              content is a little bit longer.</p>
            <img class="w-100"
                 :src="Product.imageUrl"
                 alt="">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import alert from '@/components/common/alert'
export default {
  components: {
    alert
  },
  data () {
    return {
      Product: {},
      ProductId: '',
      error: '',
      addtoCartload: false,
      isLoading: false
    }
  },
  created () {
    this.ProductId = this.$route.params.id
    this.getProduct()
  },
  methods: {
    getProduct () {
      this.isLoading = true
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${this.ProductId}`
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          response.data.product.num = 1
          this.Product = response.data.product
        } else {
          this.error = response.data.message
        }
        this.isLoading = false
      })
    },
    addCart (id, qty = 1) {
      this.addtoCartload = true
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      let data = {
        data: {
          product_id: id,
          qty
        }
      }
      this.$http.post(api, data).then((response) => {
        if (response.data.success) {
          this.$bus.$emit('message:push', response.data.message, 'success')
        } else {
          this.$bus.$emit('message:push', response.data.message, 'danger')
        }
        this.addtoCartload = false
      })
    }
  }
}
</script>

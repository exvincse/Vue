<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="input-group mb-3 mt-3 mt-lg-0">
      <input type="text"
             class="form-control w-75"
             placeholder="搜尋商品"
             v-model.trim="searchname"
             @keyup.enter="search()">
      <div class="input-group-append">
        <button type="submit"
                class="btn btn-outline-brown"
                @click="search()">搜尋</button>
      </div>
    </div>
    <div v-if="ary.length">
      <div class="text-center h3">已搜尋到{{ary.length}}個商品</div>
      <div class="row">
        <div class="col-lg-6 col-xl-4 mb-4"
             v-for="item in pageproduct"
             :key="item.id">
            <div class="card border-0 shadow-sm h-100 l-card">
              <div style="height: 150px; background-size: cover; background-position: center"
                   :style="{backgroundImage:`url(${item.imageUrl})`}">
              </div>
              <div class="card-body d-flex flex-column">

                <div class="title d-flex justify-content-between align-items-center mb-3">
                  <h5 class="card-title mb-0">
                    <span href="#"
                          class="text-dark">{{item.title}}</span>
                  </h5>
                  <h6 class="mb-0"><span class="badge badge-secondary ml-2"
                          :class="item.color">{{item.category}}</span></h6>
                </div>

                <p class="card-text body">{{item.content}}</p>

                <div class="footer d-flex justify-content-between align-items-baseline">
                  <div class="h5"
                       v-if="!item.origin_price">售價 {{item.price}} 元</div>
                  <del class="h6 text-secondary"
                       v-if="item.origin_price">原價 {{item.origin_price}} 元</del>
                  <div class="h5 text-dorange"
                       v-if="item.origin_price">特價 {{item.price}} 元</div>
                </div>
              </div>

              <div class="card-footer d-flex">
                <button type="button"
                        class="btn btn-outline-primary btn-sm"
                        @click="gotoproduct(item.id)">
                  查看更多
                </button>
                <button type="button"
                        class="btn btn-outline-Lorange btn-sm ml-auto"
                        @click="addtoCart(item.id)">
                  <i class="fas fa-spinner fa-spin"
                     v-if="addtoCartload===item.id"></i>
                  加到購物車
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>

    <div class="h3 text-center"
         v-else>
      沒有符合的商品
    </div>
    <pages :ary="ary"
           :makeout="'product'"
           @getPageData="getPageData"></pages>

  </div>
</template>

<script>
import pages from '@/components/common/pages'
import $ from 'jquery'
export default {
  components: {
    pages
  },
  props: ['active'],
  data () {
    return {
      ary: [],
      pageproduct: [],
      products: [],
      product: {},
      addtoCartload: '',
      searchname: '',
      isLoading: false
    }
  },
  created () {
    this.getProducts()
  },
  watch: {
    active () {
      this.getProducts()
      let target = $('.l-scrool')
      let targetHeight = target.offset().top
      let NavbarHeight = $('.nav-fixed').height()
      let margin = target.outerHeight(true) - target.outerHeight()
      $(window).scrollTop(targetHeight - NavbarHeight - margin)
    }
  },
  methods: {
    //  全部商品
    getProducts (page) {
      this.products = []
      this.isLoading = true
      let getpage = page || 1

      const allpage = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${getpage}`

      this.$http.get(allpage).then((response) => {
        //  取得總頁數
        let totalpage = response.data.pagination.total_pages

        for (let i = 1; i <= totalpage; i++) {
          const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${i}`
          setTimeout(() => {
            this.$http.get(api).then((response) => {
              if (this.active === 'all') {
                response.data.products.forEach((item) => {
                  if (item.is_enabled === 1) {
                    this.products.push(item)
                  }
                })
              } else {
                response.data.products.forEach((item) => {
                  if (item.is_enabled === 1 && item.category.indexOf(this.active) !== -1) {
                    this.products.push(item)
                  }
                })
              }
              this.products.forEach((item) => {
                if (item.category === '水果') {
                  item.color = 'badge-success'
                } else if (item.category === '飲料') {
                  item.color = 'badge-info'
                }
              })
              this.ary = this.products
              this.isLoading = false
            })
          }, i * 50)
        }
      })
    },
    //  新增至購物車
    addtoCart (id, qty = 1) {
      this.addtoCartload = id
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      let data = {
        data: {
          product_id: id,
          qty
        }
      }
      this.$http.post(api, data).then((response) => {
        this.addtoCartload = ''
        if (response.data.success) {
          this.$bus.$emit('message:push', response.data.message, 'success')
        } else {
          this.$bus.$emit('message:push', response.data.message, 'danger')
        }
        this.$getcart.$emit('get')
      })
    },

    getPageData (PageData) {
      this.pageproduct = PageData
    },

    search () {
      this.ary = []
      if (this.searchname === '') {
        // this.ary = this.products
        return
      }
      this.ary = this.products.filter((item) => {
        return item.title.indexOf(this.searchname) !== -1
      })
    },

    gotoproduct (id) {
      this.$router.push(`/products/${id}`)
    }
  }
}
</script>

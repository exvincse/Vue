<template>
  <div>
    <loading :active.sync="isLoading"
             style="z-index:9999;overflow-y:hidden;"></loading>
    <section class="my-5">
      <div class="container">
        <div class="col-lg-10 mx-auto">
          <div v-if="orders">
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-3 mb-md-0"
                   v-for="item in total_sort"
                   :key="item.product.id">
                <template v-if="item.product.is_enabled">
                  <div class="card">
                    <div class="card-position">
                      <div class="bg-cover"
                           style="height: 220px;"
                           :style="{backgroundImage:`url(${item.product.imageUrl})`}">
                      </div>
                      <span class="bg-primary text-white p-2 l-top">暢銷商品</span>
                    </div>
                    <div class="d-flex text-center">
                      <div class="col-7">
                        <div class="border-right py-3 text-tea">
                          <strong class="h5">{{item.product.title}}</strong>
                        </div>
                      </div>
                      <div class="col-5">
                        <div class="py-3 text-tea">
                          <strong class="h5"
                                  v-if="!item.product.origin_price">{{item.product.price}} 元</strong>
                          <strong class="h6"
                                  v-if="item.product.origin_price">{{item.product.origin_price}} 元</strong>
                        </div>
                      </div>
                    </div>
                    <a href="#"
                       class="btn btn-lwheat btn-lg l-btn"
                       @click.prevent="addtoCart(item.product.id)">
                      <span class="h4 font-weight-bold text-tea">
                        <i class="fas fa-spinner fa-spin"
                           v-if="loadingitem===item.product.id"></i>
                        加入購物車</span>
                    </a>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      loadingitem: '',
      orders: [],
      ary: [],
      product: [],
      total_sort: []
    }
  },
  created () {
    this.get()
    this.getProducts()
  },
  methods: {
    //  取得訂單資料
    get (page) {
      let pages = page || 1
      this.orders = []
      this.isLoading = true
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders?page=${pages}`
      this.$http.get(api).then((response) => {
        if (response.data.success === false) {
          this.isLoading = false
        } else {
          let totalpage = response.data.pagination.total_pages

          for (let i = 1; i <= totalpage; i++) {
            let totaldata = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders?page=${i}`
            setTimeout(() => {
              this.$http.get(totaldata).then((response) => {
                response.data.orders.forEach((item) => {
                  if (item.is_paid) {
                    item.create_at = Number(item.create_at * 1000)
                    this.orders.push(item)
                  }
                })
              }).catch((error) => {
                console.log(error)
              })
            }, i * 80)
          }
          this.ary = this.orders
          setTimeout(() => {
            this.sort()
            this.isLoading = false
          }, totalpage * 180)
        }
      })
    },
    // 取得商品資料
    getProducts (page) {
      this.product = []
      let getpage = page || 1
      const allpage = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${getpage}`
      this.$http.get(allpage).then((response) => {
        //  取得總頁數
        let totalpage = response.data.pagination.total_pages

        for (let i = 1; i <= totalpage; i++) {
          const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${i}`
          setTimeout(() => {
            this.$http.get(api).then((response) => {
              response.data.products.forEach((item) => {
                this.product.push(item)
              })
            })
          }, i * 60)
        }
      })
    },
    sort () {
      //  熱銷商品篩選
      let order = []
      let popular = []
      this.total_sort = []
      //  取得所有訂單銷售數qty
      this.ary.forEach((item) => {
        let key = Object.keys(item.products)
        key.forEach((orderid) => {
          order.push(item.products[orderid])
        })
      })
      this.product.forEach((item, index) => {
        let title = item.title
        let num = index
        popular.push({
          product: item,
          total_num: 0
        })
        //  每個產品銷售數
        order.forEach((item) => {
          if (title.indexOf(item.product.title) !== -1) {
            popular[num].total_num += item.qty
          }
        })
      })
      // 選出前3銷售數
      popular.sort((a, b) => {
        return b.total_num - a.total_num
      })
      //  顯示3筆
      for (let i = 0; i <= 2; i++) {
        this.total_sort.push(popular[i])
      }
    },
    addtoCart (id, qty = 1) {
      this.loadingitem = id
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
        this.$getcart.$emit('get')
        this.loadingitem = ''
      })
    }
  }
}
</script>

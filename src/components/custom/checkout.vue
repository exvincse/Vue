<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="mb-3">
        <h1 class="text-center">結帳</h1>
        <div class="form-row text-center">
          <div class="col-sm col-12">
            <div class="alert alert-light alert-border"
                 role="alert">
              1.輸入訂單資料
            </div>
          </div>
          <div class="col-sm col-12">
            <div class="alert alert-primary alert-border"
                 :class="{'alert-light':check}"
                 role="alert">
              2.金流付款
            </div>
          </div>
          <div class="col-sm col-12">
            <div class="alert alert-primary alert-border"
                 :class="{'alert-light':!check}"
                 role="alert">
              3.完成
            </div>
          </div>
        </div>

      </div>
    <div class="my-5 row justify-content-center">
      <form class="col-md-6"
            @submit.prevent="payOrder">
        <table class="table">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products"
                :key="item.id">
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2"
                  class="text-right">總計</td>
              <td class="text-right">{{ order.total }}</td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
            <tr>
              <th width="100">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else
                      class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right"
             v-if="order.is_paid === false">
          <button class="btn btn-danger">確認付款去</button>
        </div>

        <div class="text-right"
             v-if="order.is_paid === true">
          <router-link to="/products"
                       class="btn btn-primary">繼續逛逛</router-link>
        </div>
      </form>
     </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      check: false,
      isLoading: false,
      orderid: '',
      order: {
        user: {}
      }
    }
  },
  created () {
    this.orderid = this.$route.params.id
    this.get()
  },
  methods: {
    get () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${this.orderid}`
      this.$http.get(api).then((response) => {
        this.order = response.data.order
      })
    },
    payOrder () {
      this.isLoading = true
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${this.orderid}`
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          this.check = true
          this.get()
        }
        this.isLoading = false
      })
    }
  }
}
</script>

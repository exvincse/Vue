<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="my-5 row justify-content-center">
      <form class="col-md-6"
            @submit.prevent="submitPage()">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input type="email"
                 class="form-control"
                 name="email"
                 id="useremail"
                 v-model="form.user.email"
                 placeholder="請輸入 Email"
                 v-validate="'required|email'">
          <span class="text-danger"
                v-if="errors.has('email')">{{ errors.first('email') }}</span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input type="text"
                 class="form-control"
                 name="name"
                 id="username"
                 v-model="form.user.name"
                 placeholder="輸入姓名"
                 v-validate="'required'">
          <span class="text-danger"
                v-if="errors.has('name')">輸入姓名不得為空</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input type="tel"
                 class="form-control"
                 id="usertel"
                 name="phone"
                 v-model="form.user.tel"
                 placeholder="請輸入電話"
                 v-validate="'required'">
          <span class="text-danger"
                v-if="errors.has('phone')">收件人電話不得為空</span>
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input type="text"
                 class="form-control"
                 name="address"
                 id="useraddress"
                 v-model="form.user.address"
                 placeholder="請輸入地址"
                 v-validate="'required'">
          <span class="text-danger"
                v-if="errors.has('address')">收件人地址不得留空</span>
        </div>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea name=""
                    id="comment"
                    class="form-control"
                    cols="30"
                    rows="10"
                    v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        user: {}
      },
      isLoading: false
    }
  },
  methods: {
    submitPage () {
      this.isLoading = true
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`
      this.$validator.validate().then((valid) => {
        if (valid) {
          let data = {
            data: this.form
          }
          this.$http.post(api, data).then((response) => {
            if (response.data.success) {
              this.$router.replace(`/checkout/${response.data.orderId}`)
            }
          })
        }
        this.isLoading = false
      })
    }
  }
}
</script>

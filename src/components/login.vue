<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <form class="form-signin"
          @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal">登入</h1>
      <label for="inputEmail"
             class="sr-only">Email address</label>
      <input type="email"
             id="inputEmail"
             v-model="user.username"
             class="form-control"
             name="email"
             placeholder="Email address"
             v-validate="'required|email'"
             autofocus>
      <span class="text-danger"
            v-if="errors.has('email')">{{ errors.first('email') }}</span>
      <label for="inputPassword"
             class="sr-only">Password</label>
      <input type="password"
             id="inputPassword"
             v-model="user.password"
             class="form-control mb-0"
             name="password"
             v-validate="'required'"
             placeholder="Password">
      <span class="text-danger"
            v-if="errors.has('password')">密碼不得為空</span>
      <div class="checkbox mt-3">
        <div class="custom-control custom-checkbox">
          <input type="checkbox"
                 class="custom-control-input"
                 id="customCheck1">
          <label class="custom-control-label"
                 for="customCheck1">記住我</label>
        </div>
      </div>
      <div class="text-danger text-center mb-3"
           v-if="message">{{message}}</div>
      <button class="btn btn-lg btn-primary btn-block"
              type="submit">登入</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      message: '',
      isLoading: false
    }
  },
  methods: {
    signin () {
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.isLoading = true
          const api = `${process.env.APIPATH}/admin/signin`
          this.$http.post(api, this.user).then((response) => {
            if (response.data.success) {
              this.$router.push('/admin/products')
            } else {
              this.message = response.data.message
            }
            this.isLoading = false
          })
        }
      })
    }
  }
}
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  font-size: 1rem;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

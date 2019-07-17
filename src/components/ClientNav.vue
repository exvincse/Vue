<template>
  <div>
    <div class="nav-fixed">
      <nav class="navbar navbar-expand-lg navbar-light justify-content-between"
           style="background-color:#3c3c3c;
           relative">

        <router-link to="/index"
                     class="text-white">
          <i class="fas fa-lemon fa-2x"></i>
        </router-link>

        <div class="d-flex align-items-center">
          <div class="d-lg-block d-none">
            <ul class="navbar-nav ml-auto h6">
              <li class="l-nav-item px-2 mr-3">
                <router-link class="nav-link l-border"
                             exact-active-class="l-active"
                             to="/index">首頁</router-link>
              </li>
              <li class="l-nav-item px-2 mr-3">
                <router-link class="nav-link l-border"
                             exact-active-class="l-active"
                             to="/products">商品</router-link>

              </li>
              <li class="px-2 mr-3">
                <router-link class="nav-link l-border"
                             to="/login">後台</router-link>
              </li>
            </ul>
          </div>

          <div class="d-flex">
            <smallcart class="mr-2"></smallcart>
            <button class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#ClientNav">
              <i class="fas fa-bars text-white"></i>
            </button>
          </div>
        </div>

        <div class="collapse navbar-collapse"
             id="ClientNav">
          <ul class="navbar-nav ml-auto h6">
            <li class="l-nav-item p-2 mr-3">
              <router-link class="nav-link l-border"
                           exact-active-class="l-active"
                           to="/index">首頁</router-link>
            </li>
            <li class="l-nav-item p-2 mr-3">
              <router-link class="nav-link l-border"
                           exact-active-class="l-active"
                           to="/products">商品</router-link>

            </li>
            <li class="p-2 mr-3">
              <router-link class="nav-link l-border"
                           to="/login">後台</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>

</template>

<script>
import smallcart from '@/components/custom/SmallCart'
export default {
  components: {
    smallcart
  }
}
</script>

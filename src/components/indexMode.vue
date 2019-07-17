<template>
  <div>
    <alert></alert>
    <navbar></navbar>
    <router-view></router-view>
     <footer>
      <div class="p-5"
           style="background-color:#3c3c3c">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-3">
             <div class="text-white">
                02-1111-2222<br>
              12345678@email.com<br>
              364 苗栗縣大湖鄉水果路 111 號
             </div>
            </div>

            <div class="col-lg-9">
              <div class="text-lg-right text-left mt-lg-0 mt-4">
                <a href="#"
                   class="mr-2 text-white">
                  <i class="fab fa-facebook-square fa-2x"></i>
                </a>
                <a href="#"
                   class="mr-2 text-white">
                  <i class="fab fa-instagram fa-2x"></i>
                </a>
                <a href="#"
                   class="mr-2 text-white">
                  <i class="fab fa-github fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import navbar from '@/components/ClientNav'
import alert from '@/components/common/alert'
export default {
  components: {
    alert,
    navbar
  }
}
</script>

<template>
  <div>
    <navbar></navbar>
    <alert></alert>
    <div class="container-fluid">
      <div class="row">
        <sidebar></sidebar>
        <main role="main"
              class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/admin/navbar'
import sidebar from '@/components/admin/sidebar'
import alert from '@/components/common/alert'
export default {
  components: {
    navbar,
    sidebar,
    alert
  }
}
</script>

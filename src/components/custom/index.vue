<template>
  <div>
    <header>
      <div class="bg-cover vh-100"
           style="background-image:url('https://images.unsplash.com/photo-1528025395519-c75c01dce62a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1047&q=80');
         position:relative">
        <div class="py-5 px-4 text-center l-header d-lg-block d-none">
          <h2>不可錯過</h2>
          <span class="h5">因產季問題，不快點是吃不到的，錯過必須等上一輩子</span>
        </div>
      </div>
    </header>

    <section class="p-4" style="background-color:#fff3ee">
      <div class="container">
        <div class="row text-center text-lg-left">
          <div class="col-lg-4 p-4">
            <div class="d-flex flex-column">
              <i class="fas fa-tractor fa-3x mb-2"></i>
              <h2>有機栽種</h2>
              <p>屏除農藥、化學肥料、基因改造作物、植物生長調節劑等非天然物質的使用。是一個無論是土壤、生態體系及人類三者的健康均能夠維持永續（可持續發展）的生產系統。這系統有賴生態上的過程、多元性及適應當地環境的循環，用以克服各種發展上的困難，而不是仰賴外間的介入</p>
            </div>
          </div>
          <div class="col-lg-4 p-4">
            <div class="d-flex flex-column">
              <i class="fas fa-cocktail fa-3x mb-2"></i>
              <h2>天然現榨</h2>
              <p>新鮮水果或蔬菜為原料，經過挑選，邱喜消毒，漂洗，瀝乾，整理，機械榨汁而成的不經任何殺菌處理，提供就餐顧客飲用的非定型包裝飲料。</p>
            </div>
          </div>
          <div class="col-lg-4 p-4">
            <div class="d-flex flex-column">
              <i class="fas fa-tint-slash fa-3x mb-2"></i>
              <h2>無噴灑農藥</h2>
              <p>您知道每次噴灑農藥，當中只有很少一部分真正用於除蟲嗎？其餘絕大部分的農藥，卻全部成為環境污染物，滲進土裡、流到水裡、揮發於空氣中，不僅威脅到生物多樣性，最終還可經由各種型態進入人體，危害我們的健康。</p>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="over mb-4">
            <div class="layout-left"
                 :class="{'show':left}"
                 id='layout'>
              <div class="d-flex flex-lg-row flex-column-reverse">
                <div class="col-lg-4">
                  <p>屏除農藥、化學肥料、基因改造作物、植物生長調節劑等非天然物質的使用。是一個無論是土壤、生態體系及人類三者的健康均能夠維持永續（可持續發展）的生產系統。這系統有賴生態上的過程、多元性及適應當地環境的循環，用以克服各種發展上的困難，而不是仰賴外間的介入。
                    您知道每次噴灑農藥，當中只有很少一部分真正用於除蟲嗎？其餘絕大部分的農藥，卻全部成為環境污染物，滲進土裡、流到水裡、揮發於空氣中，不僅威脅到生物多樣性，最終還可經由各種型態進入人體，危害我們的健康。
                  </p>
                </div>

                <div class="col-lg-8">
                  <div class="bg-cover"
                       style="background-image:url('https://images.unsplash.com/photo-1507821455154-622e65d8ed08?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60');
                height:420px;
                 width: 100%;"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="over">
            <div class="layout-right"
                 :class="{'show':right}"
                 id='layout'>
              <div class="d-flex flex-lg-row flex-column">
                <div class="col-lg-8">
                  <div class="bg-cover"
                       style="background-image:url('https://images.unsplash.com/photo-1527821872005-c9b7adec9302?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80');
                height:420px;
                 width: 100%;"></div>
                </div>

                <div class="col-lg-4">
                  <p>屏除農藥、化學肥料、基因改造作物、植物生長調節劑等非天然物質的使用。是一個無論是土壤、生態體系及人類三者的健康均能夠維持永續（可持續發展）的生產系統。這系統有賴生態上的過程、多元性及適應當地環境的循環，用以克服各種發展上的困難，而不是仰賴外間的介入。
                    您知道每次噴灑農藥，當中只有很少一部分真正用於除蟲嗎？其餘絕大部分的農藥，卻全部成為環境污染物，滲進土裡、流到水裡、揮發於空氣中，不僅威脅到生物多樣性，最終還可經由各種型態進入人體，危害我們的健康。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <topProduct></topProduct>

  </div>
</template>

<script>
import alert from '@/components/common/alert'
import topProduct from '@/components/custom/TopProduct'
export default {
  components: {
    alert,
    topProduct
  },
  data () {
    return {
      left: false,
      right: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scroll)
  },

  methods: {
    scroll () {
      if (this.left === true && this.right === true) {
        window.removeEventListener('scroll', this.scroll)
        return false
      } else {
        let windowScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let Left = document.querySelector('.layout-left').offsetTop
        let Right = document.querySelector('.layout-right').offsetTop
        if (windowScroll >= Left / 2) {
          this.left = true
        }
        if (windowScroll >= Right / 2) {
          this.right = true
        }
      }
    }
  }
}
</script>

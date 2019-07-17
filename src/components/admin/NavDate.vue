<template>
  <div>
    <div class="row">
      <select class="
           custom-select
           col-lg-4
           mr-2"
              id="inputGroupSelect01"
              v-model="getyear"
              @change="changeMonth(getyear,getmonth)">
        <option value=""
                selected
                disabled>請選擇年份</option>
        <option :value="item"
                v-for='item in selectYear'
                :key="item">{{item}}</option>
      </select>

      <select class="custom-select col-lg-4 mr-2"
              id="inputGroupSelect02"
              v-model="getmonth"
              @change="changeMonth(getyear,getmonth)">
        <option value=""
                selected
                disabled>請選擇月份</option>
        <option :value="item"
                v-for='item in month'
                :key="item">{{item}}</option>
      </select>
      <button type="button"
              class="btn btn-primary"
              @click="clear()">清除欄位</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      getmonth: '',
      getyear: '',
      month: null
    }
  },
  watch: {
    getyear () {
      let NowYear = new Date().getFullYear()
      let NowMonth = new Date().getMonth() + 1
      if (this.getyear === NowYear) {
        this.month = NowMonth
      } else {
        this.month = 12
      }
    }
  },
  computed: {
    selectYear () {
      let ary = []
      let NowYear = new Date().getFullYear()
      let MinYear = new Date().getFullYear() - 5
      for (let i = MinYear; i <= NowYear; i++) {
        ary.push(i)
      }
      return ary
    }
    // selectMonth () {
    //   let NowYear = new Date().getFullYear()
    //   let NowMonth = new Date().getMonth() + 1
    //   if (this.getyear === NowYear) {
    //     this.month = NowMonth
    //   } else {
    //     this.month = 12
    //   }
    //   return this.month
    // }
  },
  methods: {
    changeMonth () {
      this.$emit('changeMonth', this.getyear, this.getmonth)
    },
    clear () {
      this.getmonth = ''
      this.getyear = ''
      this.changeMonth()
    }
  }
}
</script>

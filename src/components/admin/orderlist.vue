<template>
  <div>
    <div class="container mt-4">
      <Loading :active.sync="isLoading"></Loading>
      <div class="row">
        <NavDate class="col-lg-8"
                 @changeMonth="changeMonth"></NavDate>
        <NavSelect class="col-lg-4"
                   @select="select"></NavSelect>
      </div>
      <div class="text-center h3 mt-2">已搜尋到{{ary.length}}筆</div>
      <div class="mt-2"
           v-if="ary.length">
        <table class="table">
          <thead>
            <tr>
              <th>購買時間</th>
              <th>Email</th>
              <th>購買款項</th>
              <th>應付金額</th>
              <th>是否付款</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in pagedata"
                :key="key"
                :class="{'text-secondary': !item.is_paid}">
              <td>{{ item.create_at | DateFilter }}</td>
              <td><span v-text="item.user.email"
                      v-if="item.user"></span></td>
              <td>
                <ul class="list-unstyled">
                  <li v-for="(product, i) in item.products"
                      :key="i">
                    {{ product.product.title }} 數量：{{ product.qty }}
                    {{ product.product.unit }}
                  </li>
                </ul>
              </td>
              <td class="text-right">{{ item.total | currency }}</td>
              <td>
                <strong v-if="item.is_paid"
                        class="text-success">已付款</strong>
                <span v-else
                      class="text-muted">尚未起用</span>
              </td>
            </tr>
          </tbody>
        </table>
        <pages :ary="ary"
               :makeout="pay"
               @getPageData="getPageData">
        </pages>
      </div>

      <div v-else
           class="mt-5">
        <div class="text-center h1">
          無任何資料
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavDate from '@/components/admin/NavDate'
import NavSelect from '@/components/admin/NavSelect'
import pages from '@/components/common/pages'
export default {
  data () {
    return {
      pay: 'pay',
      orders: [],
      ary: [],
      pagedata: [],
      isLoading: false
    }
  },
  components: {
    NavDate,
    NavSelect,
    pages
  },
  created () {
    this.get()
  },
  methods: {
    //  ajax獲取資料
    get (page = 1) {
      this.orders = []
      this.isLoading = true
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${pages}`
      this.$http.get(api).then((response) => {
        if (response.data.success === false) {
          this.isLoading = false
          return
        }
        let totalpage = response.data.pagination.total_pages
        for (let i = 1; i <= totalpage; i++) {
          let totaldata = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${i}`
          setTimeout(() => {
            this.$http.get(totaldata).then((response) => {
              response.data.orders.forEach((item) => {
                item.create_at = Number(item.create_at * 1000)
                this.orders.push(item)
              })
            }).catch((error) => {
              console.log(error)
            })
          }, i * 60)
        }
        this.ary = this.orders
        setTimeout(() => {
          this.isLoading = false
        }, totalpage * 60)
      })
    },
    //  NavDate元件呼叫方法
    changeMonth (year, month) {
      let CopyAry = JSON.parse(JSON.stringify(this.orders))
      //  timestemp 轉為 yyyy/mm/dd
      let DateAry = CopyAry.map((item) => {
        let date = new Date(item.create_at)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let gettime = year + '/' + month + '/' + day
        item.create_at = gettime
        return item
      })
      if (year === '' && month === '') {
        this.get()
        return
      }

      let FilterAry = DateAry.filter((item) => {
        let time = item.create_at.split('/')
        if (month) {
          if (Number(time[0]) === year && Number(time[1]) === month) {
            return item
          }
        } else {
          if (Number(time[0]) === year) {
            return item
          }
        }
      })
      this.ary = FilterAry.slice(0)
    },
    //  NavSelect元件呼叫方法
    select (selectname) {
      this.ary = []
      if (selectname === '') {
        this.ary = this.orders
      } else {
        let FilterAry = this.orders.filter((item, index, ary) => {
          //  全部符合
          //  let toAry = item.user.email.split(',');
          //  console.log(toAry.indexOf(this.selectname));
          return item.user.email.indexOf(selectname) !== -1
        })
        this.ary = FilterAry.slice(0)
      }
    },
    //  pages元件呼叫方法
    getPageData (getdata) {
      this.pagedata = getdata
    }
  }
}
</script>

<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item"
            :class="{'disabled':nowpage===1}"
            v-if="ary.length">
          <a class="page-link"
             href="#"
             @click.prevent="scroolpage(nowpage-1)"
             aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <li class="page-item"
            v-for="page in limitPage"
            :key="page"
            :class="{'active':nowpage===page}">
          <a class="page-link"
             href="#"
             @click.prevent="scroolpage(page)">{{page}}</a>
        </li>

        <li class="page-item"
            :class="{'disabled':nowpage===TotalPage}"
            v-if="ary.length">
          <a class="page-link"
             href="#"
             @click.prevent="scroolpage(nowpage+1)"
             aria-label="Next">
            <span aria-hidden="
               true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  props: ['ary', 'makeout'],
  data () {
    return {
      nowpage: 1,
      limit: 10,
      TotalLength: 0,
      PageData: [],
      totalpage: 0
    }
  },
  watch: {
    TotalLength () {
      this.sortdata()
      this.pagedata(1)
    },
    ary: {
      handler: 'Datadefault',
      immediate: true
    }
  },
  computed: {
    TotalPage () {
      // this.TotalLength = this.ary.length
      return Math.ceil(this.ary.length / this.limit)
    },
    //  limitPage,顯示分頁限制為5頁
    limitPage () {
      let PageRange = []
      let totalpage = Math.ceil(this.ary.length / this.limit)
      if (totalpage <= 0) return
      if (this.nowpage <= 3) {
        let page = 5
        if (totalpage <= 5) page = totalpage
        for (let i = 1; i <= page; i++) {
          PageRange.push(i)
        }
        return PageRange
      } else if (this.nowpage >= 3 && this.nowpage < totalpage - 2) {
        for (let i = this.nowpage - 2; i <= this.nowpage + 2; i++) {
          PageRange.push(i)
        }
        return PageRange
      } else if (this.nowpage >= totalpage - 2) {
        for (let i = this.nowpage - 2; i <= totalpage; i++) {
          PageRange.push(i)
        }
        return PageRange
      }
    }
  },
  methods: {
    Datadefault () {
      this.TotalLength = this.ary.length
      this.totalpage = Math.ceil(this.ary.length / this.limit)
    },
    //  當前頁資料
    pagedata (page) {
      this.PageData = []
      if (this.ary.length === 0) {
        return
      }
      if (page <= 0) page = 1
      else if (page >= this.totalpage) page = this.totalpage
      this.nowpage = page
      let start = (page - 1) * this.limit
      let end = page * this.limit
      if (end >= this.TotalLength) {
        end = this.TotalLength
      }
      for (let i = start; i < end; i++) {
        this.PageData.push(this.ary[i])
      }
      this.$emit('getPageData', this.PageData)
    },
    //  點選分頁至頂或移動到特定地方
    scroolpage (page) {
      this.pagedata(page)
      if (this.makeout === 'product') {
        let target = $('.l-scrool')
        let targetHeight = target.offset().top
        let margin = target.outerHeight(true) - target.outerHeight()
        let NavbarHeight = $('.nav-fixed').height()
        $(window).scrollTop(targetHeight - NavbarHeight - margin)
      } else {
        $(window).scrollTop(0)
      }
    },

    sortdata () {
      //  判斷當前是優惠卷還是訂單或者是商品頁
      this.ary.sort((a, b) => {
        if (this.makeout === 'pay') {
          return b.is_paid - a.is_paid
        } else if (this.makeout === 'enable') {
          a.is_enabled = a.is_enabled ? a.is_enabled : 0
          b.is_enabled = b.is_enabled ? b.is_enabled : 0
          return b.is_enabled - a.is_enabled
        } else {
          return a.origin_price - b.origin_price
        }
      })
    }
  }
}
</script>

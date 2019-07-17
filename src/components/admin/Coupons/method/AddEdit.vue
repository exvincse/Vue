<template>
  <div>
    <div class="modal fade"
         id="couponModal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog"
           role="document">
        <div class="modal-content">
          <div class="modal-header bg-warning text-white"
               v-if="tempCoupon.id">
            <h5 class="modal-title"
                id="exampleModalLabel">編輯優惠卷</h5>
            <button type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-header bg-primary text-white"
               v-else>
            <h5 class="modal-title"
                id="exampleModalLabel">新增優惠卷</h5>
            <button type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text"
                     class="form-control"
                     id="title"
                     name="title"
                     v-model="tempCoupon.title"
                     v-validate="'required'"
                     placeholder="請輸入標題">
              <span class="text-danger"
                    v-if="errors.has('title')">標題不得為空</span>
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input type="text"
                     class="form-control"
                     id="coupon_code"
                     name="coupon_code"
                     v-model="tempCoupon.code"
                     v-validate="'required'"
                     placeholder="請輸入優惠碼">
              <span class="text-danger"
                    v-if="errors.has('coupon_code')">優惠碼不得為空</span>
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="date"
                     class="form-control"
                     id="due_date"
                     name="due_date"
                     v-validate="'required'"
                     v-model="due_date">
              <span class="text-danger"
                    v-if="errors.has('due_date')">日期不得為空</span>
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input type="number"
                     class="form-control"
                     id="price"
                     name="price"
                     v-validate="'required'"
                     v-model="tempCoupon.percent"
                     placeholder="請輸入折扣百分比">
              <span class="text-danger"
                    v-if="errors.has('price')">折扣百分比不得為空</span>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input"
                       type="checkbox"
                       :true-value="1"
                       :false-value="0"
                       v-model="tempCoupon.is_enabled"
                       id="is_enabled">
                <label class="form-check-label"
                       for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button"
                    class="btn btn-outline-secondary"
                    data-dismiss="modal">取消</button>
            <button type="button"
                    class="btn btn-outline-primary"
                    @click="updateCoupons()">更新優惠券</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tempCoupon'],
  data () {
    return {
      due_date: ''
    }
  },
  watch: {
    tempCoupon () {
      this.errors.clear()
    }
  },
  methods: {
    updateCoupons () {
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.$emit('updateCoupons', this.due_date)
          this.due_date = ''
        }
      })
    }
  }
}
</script>

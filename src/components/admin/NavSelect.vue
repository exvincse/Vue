<template>
  <div>
    <input type="text"
           class="form-control"
           placeholder="輸入名稱"
           aria-label="Recipient's username"
           aria-describedby="button-addon2"
           v-model="selectname">
    <!-- <div class="input-group-append">
        <button class="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                @click="select()">搜尋</button>
      </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectname: ''
    }
  },
  watch: {
    selectname: 'select'
  },
  methods: {
    select () {
      this.$emit('select', this.selectname)
    }
  }
}
</script>

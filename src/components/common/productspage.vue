<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item"
            :class="{'disabled':!pagination.has_pre}">
          <a class="page-link"
             href="#"
             @click.prevent="get(pagination.current_page-1)"
             aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <li class="page-item"
            v-for="page in pagination.total_pages"
            :key="page"
            :class="{'active':pagination.current_page===page}">
          <a class="page-link"
             href="#"
             @click.prevent="get(page)">{{page}}</a>
        </li>

        <li class="page-item"
            :class="{'disabled':!pagination.has_next}">
          <a class="page-link"
             href="#"
             @click.prevent="get(pagination.current_page+1)"
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
export default {
  props: ['pagination'],
  methods: {
    get (page) {
      this.$emit('getProducts', page)
    }
  }
}
</script>

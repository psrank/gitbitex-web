<template lang="jade">
    div.pagination
        li.prev(:class='{disabled: this.page == 1}', @click='prev')
            icon-arrow
        li.next(:class='{disabled: this.page == count}', @click='next')
            icon-arrow
</template>

<script lang="ts">
//import {Dom, Emit, Prop} from "../component";
import { Component, Vue, Emit, Prop } from "vue-property-decorator";

//@Dom('pagination', require('./pagination.jade')())
@Component
export default class PaginationComponent extends Vue {
  @Prop()
  count = 0;

  @Prop()
  value = 0;

  page = 0;

  mounted() {
    //super.mounted();
    this.page = this.value;
  }

  prev() {
    this.page--;
    this.input(this.page);
  }

  next() {
    this.page++;
    this.input(this.page);
  }

  @Emit("input")
  input(v: number) {}
}
</script>

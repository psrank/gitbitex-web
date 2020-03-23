<template lang="jade">
    div.pagination
        li.prev(:class='{disabled: this.page == 1}', @click='prev')
            icon-arrow
        li.next(:class='{disabled: this.page == count}', @click='next')
            icon-arrow
</template>

<script lang="ts">


    import {Dom, Emit, Prop} from "../component";
    import {Component, Vue} from 'vue-property-decorator'

    @Dom('pagination', require('./pagination.jade')())
    @Component
    export class PaginationComponent extends Vue {

        @Prop()
        count: number;

        @Prop()
        value: number;

        page: number = 0;

        mounted() {
            super.mounted();
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

        @Emit('input')
        input(v: number) {
        }

    }
</script>

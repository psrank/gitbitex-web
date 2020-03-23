<template>
<span class="icon icon-arrow">
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18"><path fill="none"
                                                                                             d="M2 2l7 7-7 7"></path></svg>
</span>
</template>

<script lang="ts">


    import {Dom} from "../../component";
    import {Vue} from 'vue-property-decorator'

    @Dom('icon-arrow', require('./arrow.html'))
    export class IconArrowComponent extends Vue {

        mounted() {
            super.mounted();
        }

    }
</script>

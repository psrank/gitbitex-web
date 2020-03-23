<template>
<span class="icon icon-up">
    <svg width="20" height="20" viewBox="0 0 20 20"><g fill="none" fill-rule="evenodd"><path stroke="#14181C"
                                                                                             d="M.5.5h19v19H.5z"></path><g
            stroke="#fff" stroke-linecap="square"><path d="M10 6v8M14 10H6"></path></g></g></svg>
</span>
</template>

<script lang="ts">


    import {Dom} from "../../component";
    import {Vue} from 'vue-property-decorator'

    @Dom('icon-up', require('./up.html'))
    export class IconUpComponent extends Vue {

        mounted() {
            super.mounted();
        }

    }
</script>

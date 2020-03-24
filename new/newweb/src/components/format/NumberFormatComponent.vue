<template lang="jade">
    div.format-number
        i {{v1}}
        i {{v2}}
</template>

<script lang="ts">

    //import {Dom, Prop, Watch} from "../component";
    import {Component, Vue, Prop, Watch} from 'vue-property-decorator'

    //@Dom('format-number', require('./number/number.jade')())
    @Component
    export class NumberFormatComponent extends Vue {

        @Prop()
        num: number;

        @Prop()
        fixed: number;

        v1: string = '';
        v2: string = '';
        numFixed: string;

        mounted() {
           // super.mounted();
            this.onNumChange();
        }

        @Watch('num')
        onNumChange() {

            this.numFixed = this.fixed ? this.num.toFixed(this.fixed) : String(this.num);
            this.v1 = String(Number(this.numFixed));
            this.v2 = this.numFixed.substr(this.v1.length);
        }

    }
</script>

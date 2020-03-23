<template lang="jade">
    div.modal-deposit
        div.modal-header
            h2 DEPOSIT FUNDS
            span.close(@click='close') ✕
        div.tabbar
            span(v-for='(item, index) in tabbarItems', @click='tabbarChange(index)', :class='{active: item.active}')
                | {{item.currency}} Address
        div.modal-body
            form-deposit(:currency='currency')

</template>

<script lang="ts">


    import {Dom, Emit, Prop} from "../../component";
    import {Vue} from 'vue-property-decorator'

    @Dom('modal-deposit', require('./deposit.jade')())
    export class DepositModalComponent extends Vue {

        @Prop()
        data: any;

        address: string = '';
        tabbarItems: any[] = [];
        currency: string;

        @Emit('close')
        close() {
        }

        created() {

            this.data.currencies.forEach((currency: string) => {
                this.tabbarItems.push({
                    currency: currency,
                    active: false
                });
            });

            this.tabbarChange(0);

        }

        mounted() {
            super.mounted();
        }

        tabbarChange(index: number) {
            this.tabbarItems.forEach((item: any, i: number) => {
                item.active = i == index;
            })
            this.currency = this.tabbarItems[index].currency;
        }

    }
</script>

<template lang="jade">
    div.form-withdrawal
        div.control-group
            label DESTINATION
            input.form-control.input-lg(:placeholder="this.currency+' address'", v-model='transfer.address')
        div.control-group
            label AMOUNT
            input.form-control.input-lg(placeholder="0.00", v-model='transfer.amount')
            span.currency {{this.currency}}
        p Enter a {{this.currency}} address and the amount you wish to transfer from you trading account.
        div.footer
            p.error {{error}}
            button.btn.btn-primary.btn-block.btn-lg(@click='submit', :disabled='loading') Withdrawal funds


</template>

<script lang="ts">


    import {HttpService} from './../../../service/http';
    import {Dom, Emit, Prop} from "../../component";
    import {Vue} from 'vue-property-decorator'

    @Dom('form-withdrawal', require('./withdrawal.jade')())
    export class WithdrawalFormComponent extends Vue {

        @Prop()
        currency: string;

        transfer: {
            amount: number,
            address: string
        } = {
            amount: undefined,
            address: ''
        };

        error: string = '';
        loading: boolean = false;

        @Emit()
        success() {
        }

        mounted() {
            super.mounted();
        }

        submit() {

            if (!this.transfer.address) {
                this.error = `The ${this.currency} address is required`;
                return;
            }

            if (Number(this.transfer.amount <= 0)) {
                this.error = `Please enter amount more than 0`;
                return;
            }

            this.error = '';
            this.loading = true;

            HttpService.Account.postWithdrawal(this.currency, this.transfer).then(() => {
                this.success();
            }).catch((error) => {
                this.error = error.response.data.message;
                this.loading = false;
            });

        }

    }
</script>

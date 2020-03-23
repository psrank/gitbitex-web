<template lang="jade">
    div.modal-change-password
        div.modal-header
            h2 CHANGE PASSWORD
            span.close(@click='close') ✕
        div.modal-body(v-if='!success')
            p.modal-error(v-show='error') {{error}}
            div.form.form-horizontal
                div.form-group
                    label.control-label.col-xs-4 Old password
                    div.col-xs-8
                        input.form-control(v-model='pwd.oldPassword')
                div.form-group
                    label.control-label.col-xs-4 New password
                    div.col-xs-8
                        input.form-control(v-model='pwd.newPassword')
                div.form-group
                    label.control-label.col-xs-4 Confirm
                    div.col-xs-8
                        input.form-control(v-model='pwd.confirm')
                div.form-group
                    div.col-xs-8.col-xs-offset-4
                        button.btn.btn-primary(@click='submit', :disabled='loading') Change Password
        div.success-panel(v-else)
            icon-success
</template>

<script lang="ts">

    import {HttpService} from './../../../service/http';
    import {Dom, Emit, Prop} from "../component";
    import {Component, Vue} from 'vue-property-decorator'

    export const MODAL_CHANGE_PASSWORD: string = 'modal-change-password';

    @Dom(MODAL_CHANGE_PASSWORD, require('./change-password/change-password.jade')())
    @Component
    export class ChangePasswordModalComponent extends Vue {

        @Prop()
        data: any;

        @Emit('close')
        close() {
        }

        pwd: any = {};
        error: string = '';
        loading: boolean = false;
        success: boolean = false;

        mounted() {
            super.mounted();
        }

        submit() {

            if (!this.pwd.oldPassword) {
                this.error = "Old password can't be blank";
                return;
            }
            if (!this.pwd.newPassword) {
                this.error = "New password can't be blank";
                return;
            }
            if (!this.pwd.confirm) {
                this.error = "Confirm New password can't be blank";
                return;
            }

            this.loading = true;

            HttpService.Account.changePassword(this.pwd.oldPassword, this.pwd.newPassword).then(() => {
                this.loading = false;
                this.success = true;
            }).catch((error: any) => {
                this.error = error.response.data.message;
            });

        }

    }
</script>

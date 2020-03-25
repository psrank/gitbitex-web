<template lang="jade">
    div.page.page-account.page-account-profile
    header-navbar
    div.account-container
        h1 MY PROFILE
        div.content
            div.block-inline
                ul.col-sm-6
                    li.col-xs-8
                        span.avatar
                            img(:src='account.avatar')
                        b Change Picture
                        | Max file size is 20Mb.
                    li.col-xs-4.text-right
                        button Upload
                            input.avatar-input(type="file", @change='upload', ref='file')
                ul.col-sm-6
                    li.col-xs-8
                        b Change Password
                        | Enable 2-factor authentication
                    li.col-xs-4.text-right
                        button(@click='changePassword') Change
            div.block
                ul
                    li.col-sm-6
                        b Nick Name
                        | This name will be part of your public profile.
                    li.col-sm-6
                        div.input-btn
                            input.form-control.input-lg(v-model='account.nickname')
                            button(@click='updateNickname') Save

</template>

<script lang="ts">
import Vue from "vue";
import { StoreService } from "@/store/service";
import { HttpService } from "@/service/http";
import ChangePasswordModalComponent from "@/components/modal/ChangePasswordModalComponent.vue";
//import {Route} from "../BasePage.vue";

//@Route('/account/profile', require('./profile/profile.jade')())
export class AccountProfilePage extends Vue {
  account: any = {
    avatar: "",
    nickname: ""
  };

  mounted() {
    this.needLogin = true;
    super.mounted();
    this.pageLoadingHide();
    this.setTitle("Gitbiex | Digital Asset Exchange");
    this.account = Object.assign({}, StoreService.Account.userInfo);
  }

  changePassword() {
    this.createModal(ChangePasswordModalComponent);
  }

  upload(file: any) {
    HttpService.File.upload(
      (this.$refs.file as HTMLInputElement).files[0]
    ).then((url: string) => {
      this.account.avatar = url;
      StoreService.Account.saveAvatar(url).then(() => {});
    });
  }

  updateNickname() {
    if (this.account.nickname) {
      StoreService.Account.saveNickname(this.account.nickname).then(() => {});
    }
  }
}
</script>

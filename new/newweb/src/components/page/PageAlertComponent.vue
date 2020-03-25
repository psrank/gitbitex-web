<template lang="jade">
    div.page-alert
        div.content
            div.title {{title}}
            div.text {{content}}
            div.btns
                button.cancel(@click='cancel', v-if='cancelText') {{cancelText}}
                button.submit(@click='submit')  {{submitText}}
</template>

<script lang="ts">
//import {Dom, Emit, Prop} from "../component";
import { Component, Vue, Emit, Prop } from "vue-property-decorator";

//@Dom('page-alert', require('./alert/alert.jade')())
@Component
export class PageAlertComponent extends Vue {
  @Prop()
  title = "";

  @Prop()
  content = "";

  @Prop()
  cancelText = "";

  @Prop()
  submitText = "";

  // mounted() {
  //     super.mounted();
  // }

  @Emit("cancelEvent")
  cancel() {
    return;
  }

  @Emit("submitEvent")
  submit() {
    return;
  }
}
</script>

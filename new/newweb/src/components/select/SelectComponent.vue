<template lang="jade">
    div.v-select(:class="{'search': search}")
        div.value(@click.stop='dropDown')
            input(v-model='selectValue')
            div.clear(@click='clear', v-show='selectValue && search') ✕
            div.arrow-w(:class='{active: showDropdown}')
                span.arrow
        div.select-dropdown(v-show='showDropdown')
            span(v-for='(opt, index) in filterOptions', @click='selectOpt(opt, index)') {{opt}}
</template>

<script lang="ts">
//import {Dom, Emit, Prop, Watch} from "../component";
import { Component, Vue, Emit, Prop, Watch } from "vue-property-decorator";

@Component
export default class SelectComponent extends Vue {
  @Prop()
  options!: string[];

  @Prop({ default: "Search for option" })
  placeHolder = "";

  @Prop()
  value!: number;

  @Prop()
  search!: boolean;

  documentListener: any;
  showDropdown = false;
  selectValue = "";

  mounted() {
    //super.mounted();
    this.onOptionsChange();
    this.documentListener = document.addEventListener("click", () => {
      this.showDropdown = false;
      this.selectValue = this.selectValue || this.options[this.value];
    });
  }

  get filterOptions() {
    return this.search
      ? this.options.filter((opt: string) => {
          return opt.toLowerCase().indexOf(this.selectValue.toLowerCase()) >= 0;
        })
      : this.options;
  }

  @Watch("options")
  onOptionsChange() {
    this.options.length > 0 && (this.selectValue = this.options[this.value]);
  }

  @Emit()
  select(opt: string, index: number) {
    return;
  }

  selectOpt(opt: string, index: number) {
    this.showDropdown = false;
    this.selectValue = opt;
    this.input(index);
  }

  @Emit()
  input(index: number) {
    return;
  }

  clear() {
    this.selectValue = "";
  }

  dropDown() {
    this.showDropdown = true;
    this.selectValue = "";
  }
}
</script>

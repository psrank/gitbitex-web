//import {BaseComponent, BaseFramework} from './../vendor';
import {Emit as vueEmit, Prop as vueProp, Watch as vueWatch, Vue} from "vue-property-decorator"

export const Prop = vueProp;
export const Watch = vueWatch;
export const Emit = vueEmit;

// export function Dom(elementName: string, template: string, props?: string[]) {
//     return function (target: any) {
//     target.elementName = elementName;
//     return BaseComponent({template: template, props: props})(target)
//     }
// }

export class BaseComponent extends Vue {

// static elementName: string;
//
// element: HTMLElement
//
// mounted() {
// this.element = this.$el;
// }

}


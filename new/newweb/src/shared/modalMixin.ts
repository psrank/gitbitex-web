import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ModalMixin extends Vue {

    private modal: {
        active: boolean,
        component: any,
        data: any,
        close: () => void
    } = {
        active: false,
        component: undefined,
        data: {},
        close: () => { return; }
    };

    createModal(componentName: string, data: any = {}) {
        this.modal.component = componentName;
        this.modal.active = true;
        this.modal.data = data;
        this.modal.close = () => {
            this.modal.active = false;
            this.modal.component = '';
        }
    }
}

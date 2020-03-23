// Copyright 2019 GitBitEx.com
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {HttpService} from './../../../service/http';
import {Component, Dom, Emit, Prop} from "./../../component";
import { Component, Vue } from 'vue-property-decorator'

@Dom('panel-wallet-list', require('./wallet-list.jade')())
export class WalletListPanelComponent extends Vue {

    @Prop()
    selectedWallet: any;

    funds: any[] = [];

    mounted() {

        super.mounted();

        HttpService.Account.getFunds([]).then((response: any) => {
            response.forEach((balance: any) => {
                balance.available = Number(balance.available).toFixed(8);
                balance.total = (Number(balance.available) + Number(balance.hold)).toFixed(8);
                balance.hold = Number(balance.hold).toFixed(8);
            });
            this.funds = response;
            this.select(response[0]);
        });
    }

    @Emit('send')
    send(productId: string) {
    }

    @Emit('receive')
    receive(productId: string) {
    }

    @Emit('select')
    select(wallet: any) {
    }

}
</script>

<template>
    <div class="operation-registration" v-if="step == 'reg'">
        <div>
            
        </div>
        <div class="button-container">
            <v-btn
                class="info"
                @click="step='list'"
            >{{$t('general_cancel')}}</v-btn>
            <v-btn
                class="success"
            >{{$t('general_register')}}</v-btn>
        </div>
    </div>
    <div class="operation-list" v-else>
        <div class="product-group">
            <div class="product-card col-4" v-for="(card,idx) in cardConfig" :key="idx">
                <v-card variant="tonal"
                >
                    <v-card-title class="product-card-title">{{card.product}}</v-card-title>
                    <v-divider></v-divider>
                    <v-card-subtitle>{{card.user}}</v-card-subtitle>
                    <v-card-item>{{formatMoney(card.value)}}</v-card-item>
                </v-card>
            </div>
        </div>
        <div class="add-info-panel col-12">
            <div class="col-2"></div>
            <div class="col-8">
                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-title class="expansion-panel-title">{{$t("general_validation_info")}}</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-list>
                                <v-list-item v-for="(info,idx) in additionalInfo" :key="idx">
                                    <v-list-item-title>{{info.title}}</v-list-item-title>
                                    <v-list-item-subtitle>{{info.subtitle}}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
            <div class="col-2"></div>
        </div>
        <div class="register-container">
            <v-btn
                class="success"
                @click.prevent="step='reg'"
            >{{$t('register_operation')}}</v-btn>
        </div>
        <div class="transaction-table">
            <div class="col2"></div>
            <div class="col10">
                <VuetiTable v-if="tableSource.length > 0"
                    :headers="tableFields"
                    :source="tableSource"
                ></VuetiTable>
            </div>
            
            <div class="col2"></div>
        </div>
    </div>
    
    
</template>

<script>
import VuetiTable from './VuetiTable.vue';


/* eslint-disable */
    export default{
    data: () => ({
        userAccounts: [],
        apiUri: process.env.VUE_APP_API_URI,
        cardConfig: [],
        additionalInfo: [],
        tableFields:[],
        tableSource:[],
        step:'list'
    }),
    computed: {
        $t() {
            return this.$i18n.t;
        },
        $n() {
            return this.$i18n.n;
        },
    },
    watch: {
        userAccounts(val) {
            if (val.length > 0) {
                this.setValidationInfo(val);
            }
        }
    },
    mounted() {
        let _this = this;
        //Fetch de todas las cuentas
        this.fetchUri({
            url: this.getMethodUri("cUserProducts"),
            onSuccess: this.prepareProduct
        });

        this.fetchUri({
            url:this.getMethodUri("cOperationTransaction"),
            onSuccess:this.prepareTable
        });
    },
    methods: {
        prepareProduct(data) {
            data = data.data;
            this.userAccounts = data;
            data.map((e) => {
                const accountFilter = ["Cuenta Total Ahorro", "Cuenta Total Corriente"];
                if (accountFilter.indexOf(e.alt_name) != -1) {
                    this.cardConfig.push({
                        product: e.alt_name,
                        value: parseFloat(e.amount),
                        user: e.c_user.name
                    });
                }
            });
        },
        prepareTable(data){
            data = data.data;
            this.tableFields = [
                {
                    name:'destinatary_name',
                    text:'general_destinatary'
                },
                {
                    name:'destinatary_email',
                    text:'general_email'
                },
                {
                    name:'creation_date',
                    text:'general_date'
                },
                {
                    name:'amount_value',
                    text:'general_amount',
                    formatter:(val)=>(
                        this.formatMoney(parseFloat(val))
                    )
                },
                {
                    name:'c_user',
                    text:'general_responsable',
                    formatter:(val)=>(
                        val.name
                    )
                },
                {
                    name:'comentary',
                    text:'general_comentary'
                },
                {
                    name:'c_operation_type',
                    text:'general_operation_type',
                    formatter:(val)=>(
                        val.name
                    )
                },
                {
                    name:'status',
                    text:'general_status',
                    code:'operation_status_id'

                },
            ];
            console.log("Pasando data:",data)
            this.tableSource = data;
            
        },
        setValidationInfo(data) {
            let accountFilter = ["Cuenta Total Ahorro", "Cuenta Total Corriente"];
            let mainAccount = data.filter((d) => (accountFilter.indexOf(d.alt_name) != -1 && d.user_id == 1));
            let totalAmount = mainAccount.reduce((sum, obj) => (sum + parseFloat(obj.amount)), 0);
            //Se convierte el monto a dolares canadienses para referencia
            let cadF = process.env.VUE_APP_CAD_CONV;
            this.additionalInfo.push({
                "title": this.$t("general_total_amount"),
                "subtitle": this.formatMoney(totalAmount)
            });
            
            this.additionalInfo.push({
                "title": this.$t("general_total_cad"),
                "subtitle": this.formatMoney(totalAmount * cadF)
            });
        },
        getMethodUri(method) {
            return this.apiUri + method;
        },
        formatMoney(i) {
            return this.$n(i, "currency", "en-US");
        },
        fetchUri(obj) {
            let fetchConfig = {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: Object.assign({
                    "Content-Type": "application/json",
                }, obj.headers),
            };
            if (obj.params) {
                fetchConfig["body"] = obj.params;
            }
            fetch(obj.url, fetchConfig)
                .then((response) => response.json())
                .then((data) => {
                obj.onSuccess(data);
            });
        }
    },
    components: { VuetiTable }
}
</script>

<style>
.product-card{
    padding: 15px 15px;
}

.product-card-title,.expansion-panel-title{
    background-color: #0f9c00;
    color: #1d1d1d;
}

.add-info-panel{
    margin: 30px 0px;
    display: inline-flex;
}
</style>
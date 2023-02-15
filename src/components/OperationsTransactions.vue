<template>
    <div>
        <div class="operation-registration" v-if="step == 'reg'">

            <div class="col-4"></div>
            <div class="operation-form col-4">
                <div class="operation-result-alert">
                    <StatusHandler  v-if="showResult"
                        :status-code="resultStatus"
                        :rs-handler="rsHandler"
                        :flow-id="flowId"
                    ></StatusHandler>
                </div>
                <OperationForm
                    :form-config="formConfig"
                    @form-cancel="cancelHandler"
                    @form-continue="regContinue"
                ></OperationForm>
            </div>
            <div class="col-4"></div>
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
                <div class="col-1"></div>
                <div class="col-10">
                    <MqResponsive target="md-">
                        <MobileTable v-if="tableSource.length > 0"
                            :title="'general_transaction_list'"
                            :headers="tableFields"
                            :source="tableSource"
                        ></MobileTable>
                    </MqResponsive>
                    <MqResponsive target="lg+">
                        <VuetiTable v-if="tableSource.length > 0"
                        :headers="tableFields"
                        :source="tableSource"
                        ></VuetiTable>
                    </MqResponsive>
                </div>
                
                <div class="col-1"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import OperationForm from './OperationForm.vue';
    import VuetiTable from './VuetiTable.vue';
    
    import utils from '../assets/utils.js';
    import StatusHandler from './StatusHandler.vue';

    import {MqResponsive} from 'vue3-mq';
import MobileTable from './MobileTable.vue';

    export default{
        mixins:[utils],
        data: () => ({
            userAccounts: [],
            apiUri: process.env.VUE_APP_API_URI,
            cardConfig: [],
            additionalInfo: [],
            tableFields:[],
            tableSource:[],
            step:'list',
            formConfig:[
                {
                    "name":"destinatary",
                    "type":"input",
                    "inputType":"text",
                    "placeholder":"general_destinatary",
                    "isRequired":false,
                    "defaultValue":''
                },
                {
                    "name":"email",
                    "type":"input",
                    "inputType":"email",
                    "placeholder":"general_email",
                    "isRequired":false,
                    "defaultValue":''
                },
                {
                    "name":"amount",
                    "type":"input",
                    "inputType":"money",
                    "placeholder":"general_amount",
                    "isRequired":true,
                    "defaultValue":''
                },
                {
                    "name":"responsable",
                    "type":"combo",
                    "placeholder":"general_responsable",
                    "isRequired":true,
                    "defaultValue":''
                },
                {
                    "name":"comentary",
                    "type":"input",
                    "inputType":"text",
                    "placeholder":"general_comentary",
                    "isRequired":true,
                    "defaultValue":''
                },
                {
                    "name":"destinatary",
                    "type":"input",
                    "inputType":"text",
                    "placeholder":"general_destinatary",
                    "isRequired":true,
                    "defaultValue":''
                }
            ],
            resultStatus:'',
            showResult:false,
            rsHandler:[
                {
                    flowId:'tx',
                    statusCode:'0',
                    message:'general_op_success'
                },
                {
                    flowId:'tx',
                    statusCode:'100100',
                    message:'error_operation_transactions_100100'
                }
            ],
            flowId:null,
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
            //Fetch de todas las cuentas
            this.fetchUri({
                url:"cUserProducts",
                onSuccess: this.prepareProduct,
                onError:(error)=>{
                    console.error("Error:",error);
                }
            });

            this.fetchUri({
                url:"cOperationTransaction",
                onSuccess:this.prepareTable,
                onError:(error)=>{
                    console.error("Error:",error);
                }
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
                        text:'general_destinatary',
                        formatter:(val)=>(
                            val.trim() === ""?this.$t('general_not_apply'):val
                        )
                    },
                    {
                        name:'destinatary_email',
                        text:'general_email',
                        formatter:(val)=>(
                            val.trim() === ""?this.$t('general_not_apply'):val
                        )
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
            formatMoney(i) {
                return this.$n(i, "currency", "en-US");
            },
            regContinue(form){
                
                let params = {
                    "user_id":parseInt(form.responsable),
                    "operation_type_id":parseInt(form.typeTransaction),
                    "operation_status_id":1,
                    "destinatary_name":form.destinatary,
                    "destinatary_email":form.email,
                    "creation_date":this.usDateToLatin(new Date().toLocaleDateString()),
                    "amount_value":parseFloat(form.amount),
                    "comentary":form.comentary
                }

                this.fetchUri({
                    url:"cOperationTransaction",
                    method: "POST",
                    params,
                    onSuccess:(rs)=>{
                        console.log(rs);
                        if(rs.status?.statusCode != undefined){
                            this.flowId = 'tx'
                            this.showResult = true;
                            this.resultStatus = rs.status.statusCode;
                            console.log('rsStatus:',this.resultStatus);

                        }
                    },
                    onError:(error)=>{
                        console.error("Error:",error);
                    }
                });
            },
            cancelHandler(){
                this.step = 'list';
                this.$emit("cancel-handler")
            }
        },
        components: { VuetiTable, OperationForm, StatusHandler, MqResponsive, MobileTable }
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

.operation-registration{
    display: flex;
}
.operation-registration .operation-form{
    margin-bottom: 10px;
}

.operation-result-alert {
    margin: 2rem 0px;
}

.transaction-table{
    display: flex;
}

@media only screen and (max-width: 768px) {
    .product-card.col-4{
        width: 100%;
        float: left;
    }
    .transaction-table{
        width: 100%;
        overflow-x: scroll;
    }
    .operation-registration .operation-form {
        width: 100%;
    }
}
</style>
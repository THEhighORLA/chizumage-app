<template>
    <div class="service-title">
        <h1>{{$t(serviceTitle)}}</h1>
    </div>
    <div class="service-content">
        <div v-if="serviceSelected == 'optx'" >
            <OperationsTransactions
            ></OperationsTransactions>
        </div>
    </div>
</template>

<script>
    import OperationsTransactions from './OperationsTransactions.vue';

    export default {
        components:{
            OperationsTransactions
        },  
        data: ()=>({
            serviceTitle:"",
            serviceSelected:"",
        }),
        computed: {
            $t() {
                return this.$i18n.t
            },
        },
        mounted(){
            this.getUserServices();
        },
        methods:{
            getUserServices(){
                this.serviceTitle = this.$root.currentService.title;
                this.serviceSelected =  this.$root.currentService.code;
            }
        }
    }
</script>

<style>
    .service-title{
        height: 150px;
        background-color: #15dc00;
        color: #1d1d1d;
        align-items:center;
        vertical-align: middle;
        padding-top: 50px;
        margin-bottom: 20px;
    }

    .service-content{
        margin-top: 50px;
        height: 100%;
    }
    .service-body{
        height: 100%;
    }
</style>
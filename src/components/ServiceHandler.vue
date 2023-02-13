<template>
    <div>
        <div class="service-title">
            <h1>{{$t(getCurrentService.name)}}</h1>
        </div>
        <div class="service-content">
            <div v-if="getCurrentService.code == 100" >
                <OperationsTransactions :key="optxKey"
                    @cancel-handler="reloadService(100)"
                ></OperationsTransactions>
            </div>
            <div v-else>
                Esta pagina aun no esta disponible.
            </div>
        </div>
    </div>
</template>

<script>
    import OperationsTransactions from './OperationsTransactions.vue';

    export default {
        components:{
            OperationsTransactions
        }, 
        props:{
            currentService:{
                type:Array
            },
        }, 
        data: ()=>({
            serviceTitle:"",
            serviceSelected:"",
            optxKey:0,
        }),
        computed: {
            $t() {
                return this.$i18n.t
            },
            getCurrentService() {
                return this.currentService;
            }
        },
        mounted(){
            this.getUserServices();
        },
        methods:{
            getUserServices(){
                this.serviceTitle = this.getCurrentService.title;
                this.serviceSelected =  this.getCurrentService.code;
            },
            reloadService(service){
                this.optxKey ++;
                this.serviceSelected = service;
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

    /* @media only screen and (max-width: 768px) {
        .service-title{
            height: 100%;
        }
    
    } */
</style>
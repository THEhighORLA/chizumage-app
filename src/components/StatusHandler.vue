<template>
    <div>
        <v-alert
            density="compact"
            :type="variant"
            :title="$t(title)"
            :text="$t(message)"

        ></v-alert>
    </div>
</template>

<script>
    import utils from '../assets/utils.js';

    export default {
        mixins: [utils],
        props: {
            statusCode: {
                type:Object,
            },
            flowId:{
                type:String
            },
            rsHandler:{
                type:Array
            }
        },
        data(){
            return {
                variant: 'info',
                title: '',
                message: ''
            };
        }, 
        mounted(){

            const statusConfig = this.rsHandler.filter(item => {
               
                if(item.statusCode == "0"){
                    return /^0*$/.test(this.statusCode.toString()) && item.flowId === this.getFlowId;
                }else{
                    return item.statusCode === this.statusCode.toString() && item.flowId === this.getFlowId;
                }
            })[0];
            console.log(statusConfig);
            let variant = this.getVariant(statusConfig.statusCode);
            let title = variant === 'success'? 'general_op_success' : 'general_result_title_error';
            let message = variant === 'success'? '':statusConfig.message 
            this.variant = variant;
            this.title = title;
            this.message = message;
        },
        computed:{
            getFlowId(){
                return this.flowId;
            },
        },
        methods: {
            getVariant(statusCode){
                if (/^0*$/.test(statusCode.toString())){
                    return 'success'
                }
                switch(statusCode){
                    default:
                        return 'error';
                }
            }
        }
    }


</script>
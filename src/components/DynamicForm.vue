<template>
    <div class="dynanic-form">
        <div v-for="(field,idx) in formConfig" :key="idx">
            <div class="dynamic-input" v-if="field.type == 'input'">
                <v-text-field
                    v-model="form[field.name]"
                    :counter="10"
                    :rules="nameRules"
                    :label="field.placeholder"
                    @change="field.onChange"
                ></v-text-field>
            </div>
        </div>
    </div>
    <div class="button-container">
            <v-btn
                class="info"
                @click="$emit('form-cancel')"
            >{{$t('general_cancel')}}</v-btn>
            <v-btn
                class="success"
                @click="continueHandler"
            >{{$t('general_register')}}</v-btn>
        </div>
</template>

<script>
    export default {
        props:{
            formConfig:{
                type:Array
            }
        },
        data:()=>({
            form:{}
        }),
        computed: {
        },
        methods:{
            addField(name, value) {
                this.$set(this.form, name, value)
            },
            continueHandler(){

                this.$emit('form-continue',this.form);
            }
        },
        mounted(){
            this.formConfig.forEach((field)=>{
                this.form[field.name] = field.defaultValue;
            })
            
        }
    }   
</script>
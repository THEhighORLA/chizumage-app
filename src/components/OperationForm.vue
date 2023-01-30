<template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-select
        v-model="form.typeTransaction"
        :items="typeTransactionOptions"
        :rules="[v => !!v || $t('error_field_required')]"
        :label="$t('general_operation_type')"
        required
      ></v-select>
      <div>
        <v-text-field
          v-model="form.destinatary"
          :counter="10"
          :rules="nameRules"
          :label="$t('general_destinatary')"
          required
        ></v-text-field>
    
        <v-text-field
          v-model="form.email"
          :rules="emailRules"
          :label="$t('general_email')"
          required
        ></v-text-field>
      </div>

        <v-text-field
          v-model="form.amount"
          :label="$t('general_amount')"
          required
        ></v-text-field>

        <v-select
          v-model="form.responsable"
          :items="items"
          :rules="[v => !!v || $t('error_field_required')]"
          :label="$t('general_responsable')"
          required
        ></v-select>
        
        <v-text-field
          v-model="form.comentary"
          :label="$t('general_comentary')"
          required
        ></v-text-field>
    
        <v-btn
          color="success"
          class="me-4"
          @click="continueHandler"
        >
          {{$t("general_continue")}}
        </v-btn>
    
        <v-btn
          color="info"
          @click="$emit('form-cancel')"
        >
          {{$t("general_cancel")}}
        </v-btn>
      </v-form>
  </template>

<script>


    export default {
        data: () => ({
            valid: true,
            form:{
              typeOperation:null,
              destinatary:'',
              email:'',
              amount:'',
              responsable:null,
              comentary:''
            },
            typeTransactionOptions:[],
            responsableOptions:[],
            checkbox: false,
        }),
        setup(){
          console.log(this.utilTest())
        },  
        methods: {
            continueHandler(){

              this.$emit('form-continue',this.form);
            }
        },
    }
</script>
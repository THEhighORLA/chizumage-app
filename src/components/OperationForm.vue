<template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-select
        v-model="form.typeTransaction"
        :items="typeTransactionOptions"
        :item-title="'name'"
        :item-value="'id'"
        :rules="[v => !!v || $t('error_field_required')]"
        :disabled="showResult"
        :label="$t('general_operation_type')"
        required
      ></v-select>

      <div class="complete-form" v-show="form.typeTransaction != null">

        
        <div class="transaction-destinatarry" v-show="form.typeTransaction == '2'">
          <v-text-field
            v-model="form.destinatary"
            :counter="10"
            :rules="nameRules"
            :disabled="showResult"
            :label="$t('general_destinatary')"
            required
          ></v-text-field>
      
          <v-text-field
            v-model="form.email"
            :rules="emailRules"
            :disabled="showResult"
            :label="$t('general_email')"
            required
          ></v-text-field>
        </div>

          <v-text-field
            v-model="form.amount"
            :disabled="showResult"
            :label="$t('general_amount')"
            required
            counter="25"
            @keydown="preventAlfa"
            @change="formatCurrency"
            @focus="preFormatCurrency"

          ></v-text-field>

          <v-select
            v-model="form.responsable"
            :items="responsableOptions"
            :item-title="'username'"
            :item-value="'id'"
            :rules="[v => !!v || $t('error_field_required')]"
            :disabled="showResult"
            :label="$t('general_responsable')"
            required
          ></v-select>
          
          <v-text-field
            v-model="form.comentary"
            :disabled="showResult"
            :label="$t('general_comentary')"
            required
          ></v-text-field>
          <div class="button-container" v-if="!showResult">
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
          </div>
          <div class="button-container" v-else>
            <v-btn
              color="info"
              @click="$emit('form-cancel')"
            >
              {{$t("general_back")}}
            </v-btn>
          </div>
        
        </div>
      </v-form>
  </template>

<script>
    import utils from '../assets/utils.js'


    export default {
      mixins: [utils],
      data: () => ({
            valid: true,
            form:{
              typeTransaction:null,
              destinatary:'',
              email:'',
              amount:'',
              responsable:null,
              comentary:''
            },
            showResult:false,
            typeTransactionOptions:[],
            responsableOptions:[],
            checkbox: false,
        }),
        watch:{
          'form.typeTransaction':function(val){
            if(val == '1'){
              this.form.destinatary='';
              this.form.email='';
              this.form.amount='';
              this.form.responsable=null;
              this.form.comentary='';
            }
          },
          'form.responsable':function(){
          }
        },
        setup(){
          return {
          };
        },  
        methods: {
            continueHandler(){
              this.showResult = true;
              this.$emit('form-continue',this.form);
            }
        },
        created(){

          //Obtengo data de tipo de transaccion
          this.fetchUri({
            url: 'cOperationType',
            onSuccess: (response) => {
              this.typeTransactionOptions = response.data;
            },
            onError: (error) => {
              console.error("Error:",error);
            }
          })

          //Obtengo data de responsable
          this.fetchUri({
            url: 'cUser',
            onSuccess: (response) => {
              this.responsableOptions = response.data;
            },
            onError: (error) => {
              console.error("Error:",error);
            }
          })

        }
    }
</script>

<style>
  .button-container {
      margin: 2rem;
  }
</style>
<template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="form.destinatary"
        :counter="10"
        :rules="nameRules"
        label=""
        required
      ></v-text-field>
  
      <v-text-field
        v-model="form.email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
  
      <v-select
        v-model="form.responsable"
        :items="items"
        :rules="[v => !!v || 'Item is required']"
        label="Item"
        required
      ></v-select>
  
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
            name: '',
            nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            email: '',
            emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            select: null,
            items: [
            'Item 1',
            'Item 2',
            'Item 3',
            'Item 4',
            ],
            checkbox: false,
        }),

        methods: {
            async validate () {
            const { valid } = await this.$refs.form.validate()

            if (valid) alert('Form is valid')
            },
            reset () {
            this.$refs.form.reset()
            },
            resetValidation () {
            this.$refs.form.resetValidation()
            },
        },
    }
</script>
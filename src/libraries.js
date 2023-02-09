//VUETIFY 3
import * as vuetifyx from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'
import 'vuetify/styles'
export const vuetify = vuetifyx.createVuetify({
    ssr:true,
    components:components,
    directives:directives,
    theme:{
        defaultTheme:'dark'
    }
})

//VUE I18N Multilenguaje

import {createI18n} from 'vue-i18n'
export const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: require('./assets/language_en.json'),
      es: require('./assets/language_es.json')
    },
    numberFormats:{
        'en-US': {
          currency: {
            style: 'currency',
            currency: 'USD'
          }
        },
        'ja-JP': {
          currency: {
            style: 'currency',
            currency: 'JPY',
            currencyDisplay: 'symbol'
          }
        }
      }
})

//Vue3 MQ Auxiliar para responsividad
import * as vue3mqx from "vue3-mq";
export const Vue3Mq = vue3mqx.Vue3Mq;


//Vuelidate
import * as useVuelidatex  from '@vuelidate/core'
export const {useVuelidate} = useVuelidatex;
import * as validators from '@vuelidate/validators'
export const {required,email} = validators;


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
// import {createI18n} from 'vue-i18n'
// export const i18n = createI18n({
//     locale: 'es',
//     messages: {
//       en: import ('../src/assets/language_en.json'),
//       es: import ('../src/assets/language_es.json')
//     }
// })

//Vue3 MQ Auxiliar para responsividad
import * as Vue3Mqx from "vue3-mq";
export const Vue3Mq = Vue3Mqx;


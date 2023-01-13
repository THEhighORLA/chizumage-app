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
    directives:directives
})

//VUE I18N Multilenguaje
import * as VueI18nx from 'vue-i18n'
export const VueI18n = VueI18nx;


//Vue3 MQ Auxiliar para responsividad
import * as vue3mqx from "vue3-mq";
export const Vue3Mq = vue3mqx.Vue3Mq;


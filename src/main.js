//MAIN VUE IMPORT
import {createApp} from 'vue'
import App from './App.vue'

import * as lib from './libraries'
import util from './assets/utils'


const app = createApp(Object.assign(App,{
    config: {
        methods:util
    }
}));

app.use(lib.vuetify);
app.use(lib.Vue3Mq, {
    preset: 'vuetify'
})
app.use(lib.i18n);
app.use(lib.useVuelidate);
app.use(lib.email);
app.use(lib.required);

app.mount('#app')
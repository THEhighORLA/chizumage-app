//MAIN VUE IMPORT
import {createApp} from 'vue'
import App from './App.vue'

import * as lib from './libraries'


const app = createApp(App)

app.use(lib.vuetify);
app.use(lib.Vue3Mq, {
    preset: 'vuetify'
})
app.use(lib.i18n);

app.mount('#app')
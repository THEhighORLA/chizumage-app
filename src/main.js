//MAIN VUE IMPORT
import {createApp} from 'vue'


import * as lib from './libraries'


const app = createApp({})

app.use(lib.vuetify);
app.use(lib.Vue3Mq, {
    preset: 'bootstrap5'
})
app.use(lib.i18n);

app.mount('#app')
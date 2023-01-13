//MAIN VUE IMPORT
import {createApp} from 'vue'
import App from './App.vue'


import * as lib from './libraries'

const app = createApp(App);

app.use(lib.VueI18n);
app.use(lib.vuetify);
app.use(lib.Vue3Mq, {
    preset: 'bootstrap5'
})



app.mount('#app')

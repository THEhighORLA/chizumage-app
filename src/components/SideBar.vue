<template>
  <MqResponsive target="md-">
    <div class="main-content">
      <MobileMenu
        :menu-options="getMenuOptions"
      ></MobileMenu>
      <BaseFooter></BaseFooter>
    </div>
  </MqResponsive>
  <MqResponsive target="lg+">
    <div class="main-content">
      <NormalMenu ref="normalMenu"
        :menu-options="getMenuOptions"
      ></NormalMenu>
      <BaseFooter></BaseFooter>
    </div>
  </MqResponsive>
  
</template>

<script>
/* eslint-disable */ //ELIMINAR
//External Libs 
import {MqResponsive} from 'vue3-mq';
import { useTheme } from 'vuetify/lib/framework.mjs';
import BaseFooter from './BaseFooter.vue';

//Components
import MobileMenu from './MobileMenu.vue';
import NormalMenu from './NormalMenu.vue';


export default {
  name: 'SideBar',
  components:{
    MqResponsive,
    MobileMenu,
    NormalMenu,
    BaseFooter
},
  data:()=>({
    order:0,
    menuOptions:[],
    currentService:'Prueba'
  }),
  computed: {
    getMenuOptions(){
      let _this = this;
      return [
        {
          "id":1,
          "icon":"mdi-folder",
          "title":this.$t('general_services'),
          "childServices":[
            {
              "title":this.$t("operations_transactions_title"),
              "clickHandler"(){
                console.log('Mostrando Servicio de Operaciones y transaciones')
              }
            },
          ],
        },
        {
          "id":2,
          "icon":this.getThemeIcon,
          "title":this.$t('change_theme'),
          "clickHandler":()=>{
            _this.toggleTheme();
          }
        },
        {
          "id":3,
          "icon":"mdi-translate-variant",
          "title":this.$t('current_language'),
          "clickHandler":()=>{
            _this.toggleLocation();
            _this.$refs.normalMenu.$forceUpdate();
          }
        }
      ];
    },
    getThemeIcon(){
      return useTheme().global.current.value.dark ? 'mdi-moon-waxing-crescent' : 'mdi-white-balance-sunny'
    },
    $t() {
        return this.$i18n.t
    }
  },
  mounted(){
  },
  methods:{
    changeTheme(s){
      return this.toggleTheme();
    },
    toggleLocation(){
        this.$i18n.locale = this.$i18n.locale =="en"? "es":"en";
    },
  },
  setup(){
    const theme = useTheme()

    return {
        theme,
        toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark',
        
    }
  },  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.main-content{
  height: 350px;
}
</style>

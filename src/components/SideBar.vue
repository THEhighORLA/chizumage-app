<template>
  <div>
    <MqResponsive target="md-">
      <div class="main-content">
        <MobileMenu
          :menu-options="getMenuOptions"
          :select-service="selectService"
          :current-service="currentService"
        ></MobileMenu>
      </div>
    </MqResponsive>
    <MqResponsive target="lg+">
      <div class="main-content">
        <NormalMenu ref="normalMenu"
          :menu-options="getMenuOptions"
          :select-service="selectService"
          :current-service="currentService"
        ></NormalMenu>
        <BaseFooter></BaseFooter>
      </div>
    </MqResponsive>
  </div>
</template>

<script>

//External Libs 
import {MqResponsive} from 'vue3-mq';
import { useTheme } from 'vuetify/lib/framework.mjs';
import BaseFooter from './BaseFooter.vue';
import utils from '../assets/utils.js';

//Components
import MobileMenu from './MobileMenu.vue';
import NormalMenu from './NormalMenu.vue';


export default {
  mixins:[utils],
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
    currentService:null,
    userMenu:[],
    menuConfig:[]
  }),
  computed: {
    getMenuOptions(){
      let _this = this;
      return [
        {
          "id":1,
          "icon":"mdi-folder",
          "title":this.$t('general_services'),
          "childServices":this.menuConfig
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
  created(){
    // * fetch para obtener los servicios
    // this.fetchUri()
    // const dummyData = [
    //     {
    //       'title': 'operations_transactions_title',
    //       'code': 'optx',
    //     },
    //     {
    //       'title': 'landing_page_title',
    //       'code': 'landing',
    //     },
    // ];
    this.selectService(1);
    this.fetchUri({
            url: 'cServices',
            onSuccess: (response) => {
              
              this.userMenu = response;

              this.menuConfig = response.map((op)=>{
                  return {
                    "id":op.code,
                    "title":op.name,
                    "clickHandler":()=>{
                      this.selectService(op.code);
                    }
                  }
              });
              
              
            },
            onError: (error) => {
              console.error("Error:",error);
            }
          })
    
    
    
  },
  methods:{
    changeTheme(){
      return this.toggleTheme();
    },
    toggleLocation(){
        this.$i18n.locale = this.$i18n.locale =="en"? "es":"en";
    },
    selectService(serviceCode){
      if(serviceCode == 1){
        this.currentService = {
          code:1,
          name:"landing_title"
        }
      }else{
        this.currentService = this.userMenu.filter(el=>(
        el.code === serviceCode
      ))[0];
      }
      
    }
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

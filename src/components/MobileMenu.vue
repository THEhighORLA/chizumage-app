<template>
    <v-card>
    <v-layout>
      <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

      <v-app-bar
        color="dark"
        prominent
      >
        <v-list>
          <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          ></v-list-item>
        </v-list> 

        <v-spacer></v-spacer>
        <div  v-for="(op,index) in menuOptions" :key="index">
          <v-btn v-if="op.childServices == undefined"
            :key="op.id"
            variant="text"
            :icon="op.icon"
            @click.prevent="op.clickHandler"
          ></v-btn>
          <v-app-bar-nav-icon v-else
            :key="index"
            variant="text" 
            @click.stop="drawerHandler(op.childServices)"
          ></v-app-bar-nav-icon>   
        </div>

        
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        location="bottom"
        temporary
      >
        <v-list
          v-for="(item,index) in items"
          :key="index"
        >
          <v-list-item
            @click.prevent="makeClick(item)"
          >{{$t(item.title)}}</v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <ServiceHandler
          :current-service="currentService"
        ></ServiceHandler>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import ServiceHandler from './ServiceHandler.vue';
 export default {
    props:{  
      menuOptions:{
          type:Array,
          default:()=>([])
      },
      currentService:{
          type:Array
      },
      selectService:{
          type:Function
      },
    },
    components:{
      ServiceHandler
    },
    data: () => ({
      drawer: false,
      group: null,
      items: [
      ],
    }),
    computed:{
      $t() {
        return this.$i18n.t
      }
    },
    watch: {
      group () {
        this.drawer = false
      },
    },
    methods:{
      drawerHandler(itemList){
        this.items = itemList
        this.drawer = !this.drawer;
      },
      titleHandler(op){
          return typeof op.title == 'function'?op.title():op.title
      },
      makeClick(op){
        this.rail = true;
        op.clickHandler();
      }
    }
  }
</script>
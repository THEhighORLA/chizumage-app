<template>
  <SideBar></SideBar>
  <!-- <BaseFooter></BaseFooter> -->
</template>

<script>
import SideBar from './components/SideBar.vue'
// import BaseFooter from './components/BaseFooter.vue';
export default {
  name: 'App',
  components: {
    SideBar,
    // BaseFooter
  },
  data:()=>({
    currentService:null,
    serviceList:[]
  }),
  created(){
      //Consulta de lista de servicios
      this.getUserServices();
  },
  methods:{
    getUserServices(){
      //Se deberia de realizar algun fetch para obtener los servicios asociados al usuario logueado
      const serviceList = [
          {
              "title":"operations_transactions_title",
              "code":"optx"
          }
      ];

      this.serviceList = serviceList;
      this.currentService = serviceList[0];
    },
  }
}
</script>

<style>
#app {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.col-1,.col-2,.col-3,.col-4,.col-5,.col-6,
.col-7,.col-8,.col-9,.col-10,.col-11,.col-12{
  float: left;
}
.col-1{
  width: 8.33%;
}

.col-2{
  width: 16.66%;
}

.col-3{
  width: 25%;
}

.col-4{
  width: 33.33%;
}

.col-5{
  width: 41.66%;
}
.col-6{
  width: 50%;
}

.col-7{
  width: 58.34%;
}

.col-8{
  width: 66.72%;
}

.col-9{
  width: 75%;
}

.col-10{
  width: 83.40%;
}

.col-11{
  width: 91.74%;
}

.col-12{
  width: 100%;
}

button.success{
  background: #0f9c00!important;
}
</style>

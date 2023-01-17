<template>
  <MqResponsive target="md-">
    <div class="main-content">
      <MobileMenu></MobileMenu>
    </div>
  </MqResponsive>
  <MqResponsive target="lg+">
    <div class="main-content">
      <NormalMenu></NormalMenu>
    </div>
  </MqResponsive>
</template>

<script>
//External Libs 
import {MqResponsive} from 'vue3-mq';

//Components
import MobileMenu from './MobileMenu.vue';
import NormalMenu from './NormalMenu.vue';

export default {
  name: 'SideBar',
  components:{
    MqResponsive,
    MobileMenu,
    NormalMenu
  },
  props: {
    msg: String
  },
  data:()=>({
    order:0,
  }),
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
  height: 650px;
}
</style>

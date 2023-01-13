<template>
  <MqResponsive target="md-">
      <MobileMenu></MobileMenu>
  </MqResponsive>
  <MqResponsive target="lg+">
    <NormalMenu></NormalMenu>
  </MqResponsive>
</template>

<script>
import MobileMenu from './MobileMenu.vue';
import NormalMenu from './NormalMenu.vue';
import {MqResponsive} from 'vue3-mq';

export default {
  name: 'SideBar',
  components:{
    MobileMenu,
    NormalMenu,
    MqResponsive
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
</style>

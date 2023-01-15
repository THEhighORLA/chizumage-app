<template>
  <SideBar />
</template>

<script>
import SideBar from './components/SideBar.vue'

export default {
  name: 'App',
  components: {
    SideBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.col-1{
  grid-column: span 1;
}

.col-2{
  grid-column: span 2;
}

.col-3{
  grid-column: span 3;
}

.col-4{
  grid-column: span 4;
}

.col-5{
  grid-column: span 5;
}
.col-6{
  grid-column: span 6;
}

.col-7{
  grid-column: span 7;
}

.col-8{
  grid-column: span 8;
}

.col-9{
  grid-column: span 9;
}

.col-10{
  grid-column: span 10;
}

.col-11{
  grid-column: span 11;
}

.col-12{
  grid-column: span 12;
}
</style>

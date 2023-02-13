<template>
    <div class="mobile-table">
        <div class="table-top">
            <h2 class="table-title">{{$t(title)}}</h2>
        </div>
        <div class="vuetitable-mobile" :class="$vuetify.theme.name">
            <div class="row" v-for="(item, rowIdx) in currentPageData" :key="item.id">
                <div v-for="(header) in headers" :key="header.value" class="row-data-pair">
                    <div class="row-title">{{$t(header.text)}}</div>
                    <div class="row-value" v-html="getRowValue(item[header.name], header.name, rowIdx)"></div>
                </div>
                <td v-show="buttons.length > 0">
                    <button v-for="button in buttons" :key="button.text" @click="button.action(item)">
                    {{ button.text }}
                    </button>
                </td>
            </div>
        </div>  
        <div class="pagination-container">
            <div class="col-4"></div>
            <div class="pagination-item col-1" @click="previosPage" :disabled="currentPage === 1"><div class="mdi-chevron-left mdi v-icon notranslate v-icon--size-default"></div></div>
            <span class="pagination-item col-2" >{{ currentPage }} / {{ totalPages }}</span>
            <div class="pagination-item col-1" @click="nextPage" :disabled="currentPage === totalPages"><div class="mdi-chevron-right mdi v-icon notranslate v-icon--size-default"></div></div>
            <div class="col-4"></div>
        </div>
    </div>
  </template>

  
<script>
export default {
  props: {
    title:{
        type: String,
    },
    headers: {
      type: Array,
      required: true
    },
    source: {
      type: Array,
      required: true
    },
    buttons: {
      type: Array,
      required: false,
      default: () => [],
    },
    perPage: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data: () => ({
    tableData: [],
    currentPage: 1,
    totalPages: 0
  }),
  computed: {
    currentPageData() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.tableData.slice(start, end);
    }
  },
  mounted() {
    this.source.map((s) => {
      let obj = {};
      this.headers.forEach((f) => {
        obj[f.name] = s[f.name];
      });
      this.tableData.push(obj);
    });
    this.totalPages = Math.ceil(this.tableData.length / this.perPage);
  },
  methods: {
    showField(key) {
      return this.headers.filter((f) => (
        f.name == key
      )).length > 0;
    },
    getRowValue(row, header, rowIdx) {
      let fieldConf = this.headers.filter((f) => {
        return f.name == header;
      });
      let finalVal = "";
      if(fieldConf.length > 0){
        fieldConf = fieldConf[0];
        if(fieldConf.formatter){
          finalVal = fieldConf.formatter(row);
        }else if(fieldConf.name == "status"){
          finalVal = this.getGeneralStatus(this.source[rowIdx][fieldConf.code]);
        }else{
          finalVal = row;
        }
        return finalVal;
      }
    },
    getGeneralStatus(statusId){
      let status = "";
      switch (statusId) {
        case 1:
          {
            //En Proceso
            status = `<div class="mdi-progress-close mdi v-icon notranslate v-icon--size-default" 
              style="color:blue;"
            ></div> ` + this.$t('status_inprogress');
              break;
          }
        case 2:
          {
              //Efectuado
            status = `<div class="mdi-check-outline mdi v-icon notranslate v-icon--size-default"
              style="color:green;"
            ></div> ` + this.$t('status_processed');
          }
      }
      return status;
    },
    previosPage(){
      this.currentPage--;
      this.backToTop();
    },
    nextPage(){
      this.currentPage++;
      this.backToTop();
    },
    backToTop(){
        this.$nextTick(()=>{
            document.querySelector('.table-top').scrollIntoView();
        })
    }
  }
}
</script>

<style>
html {
    scroll-behavior: smooth;
}
.mobile-table{
    margin: 3rem 0rem;
}
.vuetitable-mobile {
    margin-top: 25px;
    width: 100%;
    border-collapse: collapse;
    color: #333;
    background-color: #111;/**#0f9c00 */
}

.vuetitable-mobile.dark{
    color: #fff;
  }

.row{
    padding: 10px;
    border-bottom: 1px solid #ccc;
    
}
.row-data-pair{
    width: 100%;
    display: flex;
}

.row-title,.row-value{
    padding: 1rem;
}

.row-title{
    font-weight: bold;
    font-size: 1rem;
    width: 40%;
}

.row-value{
    font-size: 1rem;
    width: 60%;
}

.vuetitable-mobile.dark .row:nth-child(even) {
  background-color: #555;
}

.vuetitable-mobile.light .row:nth-child(even) {
  background-color: #e4e4e4;
}
.pagination-container{
    margin-top: 1rem;
    display: flex;
    width: 100%;
    float: left;
}
.pagination-item {
  color: #fff;
  border: none;
  cursor: pointer;
}

.pagination-item:hover {
  background-color: #333;
}


</style>

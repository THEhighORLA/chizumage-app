<template>
  <div>
    <table class="vuetitable" :class="$vuetify.theme.name">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.value">{{ $t(header.text) }}</th>
          <th v-show="buttons.length > 0">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, rowIdx) in currentPageData" :key="item.id">
          <td v-for="(header) in headers" :key="header.value" v-html="getRowValue(item[header.name], header.name, rowIdx)"></td>
          <td v-show="buttons.length > 0">
            <button v-for="button in buttons" :key="button.text" @click="button.action(item)">
              {{ button.text }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-container">
      <button @click="previosPage" :disabled="currentPage === 1"><div class="mdi-chevron-left mdi v-icon notranslate v-icon--size-default"></div></button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages"><div class="mdi-chevron-right mdi v-icon notranslate v-icon--size-default"></div></button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
    },
    nextPage(){
      this.currentPage++;
    }
  }
}
</script>

<style>
  table {
    margin-top: 25px;
    width: 100%;
    border-collapse: collapse;
    color: #333;
  }

  table.dark{
    color: #fff;
  }

th {
  background-color: #0f9c00;
  color: #fff;
  font-weight: bold;
  padding: 10px;
  text-align: left;
}

td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

table.dark tr:nth-child(even) {
  background-color: #555;
}

table.light tr:nth-child(even) {
  background-color: #e4e4e4;
}

button {
  background-color: #0f9c00;
  color: #fff;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  margin-right: 5px;
}

button:hover {
  background-color: #333;
}

@media only screen and (max-width: 768px) {
  table {
      width: 100%;
    }
    th, td {
      display: block;
    }
    th {
      display: none;
    }
    td {
      border: none;
      border-bottom: 1px solid #ddd;
    }

}
</style>

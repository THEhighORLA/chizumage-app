<template>
  Tabla
    <v-table>
      <thead>
        <tr>
          <th class="text-left" v-for="(field,idx) in fields" :key="idx">
                {{$t(field.text)}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item,idx) in tableData"
          :key="idx"
        >
          <td 
            v-for="(row,subIdx) in item" :key="subIdx"
            v-show="showField(subIdx)"  
            v-html="getRowValue(row,subIdx,idx)"
            ></td>
        </tr>
      </tbody>
    </v-table>
</template>

<script>
    export default {
        props:{
            fields:{
                type:Array
            },
            source:{
                type:Array
            }
        },
        data:()=>({
          tableData:[]
        }),
        created(){
          this.source.map((s)=>{
            let obj = {};
            this.fields.forEach((f)=>{
              obj[f.name] = s[f.name];
            })
            this.tableData.push(obj);
          })
          
        },
        methods:{
            showField(key){
                return this.fields.filter((f)=>(
                    f.name == key
                )).length > 0;
            },
            getRowValue(row,idx,rowIdx){
              let fieldConf = this.fields.filter((f)=>(
                    f.name == idx
              ));
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
            }
        }
    }
</script>
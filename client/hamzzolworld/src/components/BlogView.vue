<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="(item,i) in textData"
      :key="i"
    >
      <v-expansion-panel-header>
        {{item.title}}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card
          class="mx-auto"
          max-width="344"
          outlined
        >
          <v-card-title>
            <!-- <span class="text-h5">{{item.title}}</span> -->
            <v-text-field
              v-model="item.title"
            >

            </v-text-field>
          </v-card-title>
          <v-card-text>
            <p class="timetext">수정시각: {{item.time}}</p>
            <v-textarea
              v-model="item.description"
            >
            </v-textarea>
          </v-card-text>
          <div class="btninfo">
            <v-btn class="mr-1" color="primary" @click="clickSaveBtn(item)">save</v-btn>
            <v-btn color="error" @click="clickDeleteBtn(item)">delete</v-btn>
          </div>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import axios from 'axios'
  export default {
    data() {
      return {
        ui: {
            dialogTitle: '게시글 수정'
        },
        // datas: {
            show: false,
            textData: [],
            selectedItem: 1,
        // },
      }
    },
    mounted(){
        this.setText();
    },
    methods:{
        setText(){
            axios.get(`/api/listtext` , {
            }).then((res)=>{
                if(res.data !== ''){
                    this.textData = res.data
                    this.textData.forEach(el => {
                      Object.assign(el, {icon: 'mdi-account'})
                    })
                }
            })
        },
        clickAllow(){
          this.show = !this.show
        },
        clickSaveBtn(item){
          axios.put(`/api/edittext` , {
            _id: item._id,
            title: item.title,
            description: item.description
          }).then(()=>{
            this.setText();
          })
        },
        clickDeleteBtn(item){
          axios.delete(`/api/deletetext/${item._id}`)
          .then(()=>{
            this.setText();
          })
        }
    },
  }
</script>
<style scoped lang="scss">
  @import './blogview'
</style>
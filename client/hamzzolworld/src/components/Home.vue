<template>
  <v-card>
    <v-toolbar
      color="white"
      dark
      flat
    >
      <div class="mt-3 mb-2"><button @click="clickLogo"><v-img src="@/images/logo.png"></v-img></button></div>
      
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        text
        small
        @click="clickLoginBtn"
      >
        {{ui.loginInfo}}
      </v-btn>
      <v-btn
        class="ml-3"
        color="primary"
        text
        small
        @click="clickSignUpBtn"
      >
        {{ui.signInfo}}
      </v-btn>

      <template v-slot:extension>
        <v-tabs
          background-color="primary"
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
            v-for="item in items"
            :key="item.text"
          >
            <v-icon class="pr-1">{{item.icon}}</v-icon> {{ item.text }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab"
    >
      <v-tab-item
        v-for="item in items"
        :key="item.text"
      >
        <v-card flat>
          <home-view
            v-if="tab === 0"
          />
          <blog-view
            v-if="tab === 1"
          />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
  import axios from 'axios'
  import HomeView from './HomeView.vue'
  import BlogView from './BlogView.vue'
  export default {
    components: {
      HomeView,
      BlogView,
    },
    data () {
      return {
        ui: {
          loginInfo: '',
          signInfo: ''
        },
        datas: {},
        tab: null,
        items: [
          {text : 'Home' , icon: 'mdi-home'},
          {text : 'Blog' , icon: 'mdi-camera-enhance-outline'}
        ],
        // text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
    mounted(){
      if(this.$route.query.hasOwnProperty('loginSuccess')){
        this.ui.loginInfo = `${this.$route.query.user_name}님 ^^`
        this.ui.signInfo = 'LogOut'
      }else{
        this.ui.loginInfo = 'LogIn'
        this.ui.signInfo = 'Sign Up'
      }
    },
    methods: {
      clickLoginBtn(){
        if(this.$route.path !== '/login'){this.$router.push({ name: 'login'})}
      },
      clickSignUpBtn(){
        if(this.ui.signInfo === 'Sign Up'){
          if(this.$route.path !== '/signup'){this.$router.push({ name: 'signup'})}
        }else{
          axios.get(`/api/users/logout`)
          .then((result) => {
            this.ui.loginInfo = 'LogIn'
            this.ui.signInfo = 'Sign Up'
          }).catch((err) => {
            console.log(err)
          })
        }
      },
      clickLogo(){
        this.tab = 0
      }
    }
  }
</script>
<style scoped lang="scss">
  @import './home'
</style>
<template>
  <v-layout column fill-height>
    <h1 class="logintext">Login</h1>
    <v-card class="logincontainer">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        :counter="10"
        :rules="passwordRules"
        label="PassWord"
        required
        @input="inputPassWord"
      ></v-text-field>
      <!-- <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field> -->
      
      <div class="formbtn">
        <v-btn
          :disabled="!valid"
          color="primary"
          @click="validate"
        >
          확인
        </v-btn>
      </div>
    </v-form>
  </v-card>
  </v-layout>
  
</template>
<script>
  import axios from 'axios'
  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'PassWord is required',
      ]
    }),

    methods: {
      async validate () {
        this.$refs.form.validate()
        await axios.post('/api/users/login' , {
            email: this.email,
            password: this.password 
        }).then((result) => {
            if(result.data.loginSuccess === true){
                if(this.$route.path !== '/'){this.$router.push({ 
                  name: 'home',
                  query: {loginSuccess: result.data.loginSuccess, user_name: result.data.userId}
                })}
            }else{
              window.alert(result.data.message)
            }
        }).catch((err) => {
          console.log(err)
        })
      },
      inputPassWord(password){
      }
    },
  }
</script>
<style scoped lang="scss">
  @import './login'
</style>

<template>
    <v-layout column fill-height>
        <h1 class="signuptext">회원가입</h1>
        <v-card class="signupcontainer">
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <v-text-field
                    v-model="name"
                    :counter="10"
                    :rules="nameRules"
                    label="Name"
                    required
                ></v-text-field>
        
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    type="password"
                    :counter="15"
                    :rules="passwordRules"
                    label="PassWord"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="confirmPassword"
                    type="password"
                    :counter="15"
                    :rules="confirmPasswordRules"
                    label="PassWord Confirm"
                    required
                ></v-text-field>
      
      
                <div class="formbtn">
                    <v-btn
                        :disabled="!valid"
                        color="primary"
                        @click="validate"
                        >
                    가입하기
                    </v-btn>
                </div>
            </v-form>
        </v-card>
    </v-layout> 
</template>
<script>
  import axios from 'axios'
  export default {
    data: (vm) => ({
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
      ],
      confirmPassword: '',
        confirmPasswordRules: [
          v => !!v || 'PassWord Confirm is required',
          v => v === vm.password || 'PassWord is Not Same'
        ]
    }),

    methods: {
      validate () {
        if(this.$refs.form.validate()){
          axios.post(`/api/users/register` , {
            name: this.name,
            email: this.email,
            password: this.password 
        }).then((result) => {
            if(result.data.success === true){
                if(this.$route.path !== '/'){this.$router.push({ name: 'home'})}
            }
        })
        }        
      },
    },
  }
</script>
<style scoped lang="scss">
  @import './signup'
</style>

const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  devServer:{
    proxy:{
      '/api':{
        target:'http://localhost:5001',
        changeOrgin: true
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: false
})
  


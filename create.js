var fs = require('fs')

var argv = process.argv.splice(2)
var key = argv[0] || 'index'
var initUrl = argv[1] || './'
console.log(`关键字为${key},路径为${initUrl}`)

fs.access(`${initUrl}${key}/`, (err) => {
  if (!err) {
    console.log(`${key}文件夹存在，退出命令`)
  } else {
    fs.mkdirSync(`${initUrl}${key}/`, (err) => {
      if (err) {
        return console.error(err)
      }
      console.log(`${initUrl}${key}文件夹创建成功`)
    })

    var jsonInit = `{
  "navigationBarTitleText": "登录",
  "disableScroll": true
}
`

    fs.writeFileSync(`${initUrl}${key}/main.json`, jsonInit)
    console.log('main.json写入成功')
    var mainJsInit = `import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
`

    fs.writeFileSync(`${initUrl}${key}/main.js`, mainJsInit)
    console.log('main.js写入成功')
    var vueInit = `<template>
  <div id='${key}'>

  </div>
</template>
<script>
export default {
  name: '${key}',
  data () {
    return {
    }
  }
}
</script>
<style lang="scss">
@import '../../styles/index.scss';
#${key} {
  width: $all;
  height: 100vh;
  overflow: hidden;
  background: #f9f9f9;
}
</style>
`
    fs.writeFileSync(`${initUrl}${key}/index.vue`, vueInit)
    console.log('index.vue写入成功')
  }
})

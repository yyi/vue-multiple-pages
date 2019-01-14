<template>
  <div id="app">
    <el-card class="index-card">
      <div slot="header">{{ msg }}</div>
      <ul>
        <li>
          <a
            href="https://github.com/Plortinus/vue-multiple-pages"
            target="_blank"
          >
            Vue Multiple Pages
          </a>
        </li>
        <li>
          <a
            href="https://github.com/Plortinus/element-china-area-data"
            target="_blank"
          >
            Element China Area Data
          </a>
        </li>
      </ul>
      <el-button type="primary" @click="gogogo">
        To Customer Home Page
      </el-button>
      <el-button type="primary" plain @click="tototo">
        To User Login Page
      </el-button>
      <el-button type="primary" plain @click="gotoshop">go to shop</el-button>
      <el-button type="primary" plain @click="gotouser">go to user</el-button>
    </el-card>
  </div>
</template>

<script>
// import modal from '../../components/modal.vue'

export default {
  /* components: {
    modal
  },*/
  data() {
    return {
      msg: 'Use Vue 2.0 Today!'
    }
  },
  created() {
    console.log('hhhhh')
    let p = new Promise(resolve => {
      console.log('ok')
      resolve('ok1111')
    })
    setInterval(() => {
      p.then(msg => {
        console.log(msg)
      })
      this.now = new Date()
    }, 2000)

    const sleep = timeout => {
      return new Promise(resolve => {
        setTimeout(resolve, timeout)
      })
    }
    ;(async () => {
      console.time('async')
      await sleep(3000)
      console.timeEnd('async')
    })()
    console.log('create end')
  },
  methods: {
    gogogo() {
      location.assign('../customer/home/')
    },
    tototo() {
      location.assign('../user/login/login.html')
    },
    gotoshop() {
      location.assign('/shop/')
    },
    gotouser() {
      location.assign('../user/')
    }
  }
}
</script>

<style lang="postcss">
.index-card {
  width: 800px;
  margin: 100px auto;
}
</style>

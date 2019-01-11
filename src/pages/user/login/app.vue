<template>
  <el-card class="login-card">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <div slot="header">
      <img :src="logo" class="logo-img" />
      <span class="logo-text">Management System</span>
    </div>
    <el-form class="login" label-width="100px">
      <el-form-item label="Phone">
        <el-input
          placeholder="Please enter phone number"
          v-model="ruleForm.phone"
          type="tel"
          :maxlength="11"
        ></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input
          placeholder="Please enter password"
          v-model="ruleForm.password"
          type="password"
          @keyup.enter="login"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">Login</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import image from '../../../assets/logo.png'

export default {
  data() {
    return {
      ruleForm: {
        phone: '',
        password: ''
      },
      logo: image,
      input: ''
    }
  },

  methods: {
    login() {
      location.assign('/')
    }
  }
}
</script>

<style>
.login-card {
  width: 800px;
  margin: 100px auto;
}

.login {
  display: block;
  width: 400px;
  margin: 100px auto;
}

.logo-img {
  width: 90px;
}

.logo-text {
  margin-left: 20px;
}
</style>

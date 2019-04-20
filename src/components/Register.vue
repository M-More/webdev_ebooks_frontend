<template>
  <div id="register">
    <div id="heading">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <p id="title">e-Book</p>
        <p id="subtitle">新用户注册</p>
      </el-menu>
      <div class="line"></div>
    </div>

    <br/>
    <br/>

    <div id="form">
      <br/>
      <el-form :model="ruleForm01" status-icon :rules="rules1" ref="ruleForm01" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm01.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm01.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm01.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="ruleForm01.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm01')">注册</el-button>
          <el-button @click="resetForm('ruleForm01')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    var validateName = (rule, value, callback) => {
      this.$axios.get('/users/showAll')
        .then((response) => {
          this.userList = response.data
        })
      this.checkName = true
      for (var i = 0; i < this.userList.length; i++) {
        if (this.userList[i].name === value) {
          this.checkName = false
        }
      }
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (this.checkName === false) {
        callback(new Error('用户名重复!'))
      } else if (value.length >= 30) {
        callback(new Error('用户名长度需小于30个字符!'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length >= 40) {
        callback(new Error('密码长度需小于40个字符!'))
      } else {
        if (this.ruleForm01.checkPass !== '') {
          this.$refs.ruleForm01.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm01.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userList: [],
      checkName: true,
      ruleForm01: {
        name: '',
        pass: '',
        checkPass: '',
        email: ''
      },
      rules1: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$axios.get('/users/create', {
        params: {
          userName: this.ruleForm01.name,
          userPassword: this.ruleForm01.pass,
          userEmail: this.ruleForm01.email,
          userKind: '用户',
          userStatus: true
        }
      })
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('注册成功!')
        } else {
          console.log('注册失败!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
  @import "../assets/css/form.css";
</style>

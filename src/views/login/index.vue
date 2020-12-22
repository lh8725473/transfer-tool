<template>
  <!-- <div class="login-container"> -->
  <!-- <input v-model="loginForm.userName">
    <input v-model="loginForm.password"> -->

  <div id="login-wrap">
    <div class="login-main">
      <div class="login-main-left" />
      <el-divider direction="vertical" />
      <div class="login-main-right">
        <div class="login-box-wrap">
          <h2>用户登录</h2>
          <div class="login-box">
            <el-input v-model="loginForm.userName" placeholder="请输入用户名">
              <i
                slot="prefix"
                class="iconfont iconxingmingyonghumingnicheng"
              />
            </el-input>
            <el-input v-model="loginForm.password" placeholder="请输入密码" show-password>
              <i slot="prefix" class="iconfont iconmima" />
            </el-input>
            <el-button round @click.native.prevent="handleLogin">立即登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="userName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="userName"
          v-model="loginForm.userName"
          placeholder="userName"
          name="userName"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div class="tips">
        <span style="margin-right:20px;">userName: admin</span>
        <span> password: any</span>
      </div>

    </el-form> -->
  <!-- </div> -->
</template>

<script>
import { validuserName } from '@/utils/validate'
import { login } from '@/api/user'
import Vue from 'vue'
import socket from 'socket.io-client'

export default {
  name: 'Login',
  data() {
    const validateuserName = (rule, value, callback) => {
      if (!validuserName(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userName: 'test',
        password: '123456'
      },
      loginRules: {
        userName: [{ required: true, trigger: 'blur', validator: validateuserName }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
    // loginForm: {
    //   handler: function(newV, oldV) {
    //     console.log(newV.userName)
    //     console.log(oldV.userName)
    //     console.log(newV.password)
    //     console.log(oldV.password)
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  created() {
    // const unwatch = this.$watch(
    //   'loginForm',
    //   (a, b) => {
    //     console.log(a)
    //     console.log(b)
    //     console.log(c)
    //     console.log('数据发生了变化')
    //   },
    //   {
    //     deep: true
    //   }
    // )
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      login(this.loginForm).then((res) => {
        console.log(res)
        localStorage.setItem('token', res.token)
        // socket链接
        Vue.prototype.$socket = socket(process.env.VUE_APP_BASE_WS + '?token=' + res.token)
        this.$router.push('/home')
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true
      //     login().then((res) => {
      //       console.log(res)
      //       this.loading = false
      //     }).catch(() => {
      //       this.loading = false
      //     })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

#login-wrap {
  width: 100%;
  height: 100%;
  background-color: #4586e2;
  background: url(./images/bj.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  .login-main {
    width: 940px;
    height: 450px;
    display: flex;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .login-main-left {
      flex: 3;
      background: url(./images/peitu.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 80% 80%;
    }
    .el-divider {
      height: 100%;
      box-shadow: 0px 0px 10px 0px rgba(0, 110, 165, 0.3);
    }
    .login-main-right {
      flex: 2;
      .login-box-wrap {
        padding-top: 64px;
        h2 {
          height: 28px;
          line-height: 28px;
          font-size: 16px;
          padding-left: 10px;
          position: relative;
          left: -8px;
          &::before {
            content: '';
            width: 5px;
            height: 100%;
            background-color: #4978bc;
            position: absolute;
            left: 0;
            top: 0;
          }
        }
        .login-box {
          padding: 60px;
          .el-input {
            margin-bottom: 18px;
            .el-input__inner {
              padding-left: 50px;
              background-color: #f7f7f9;
              border: 1px solid #e3e5ec;
            }
            .el-input__prefix {
              left: 15px;
              display: flex;
              justify-content: center;
              align-items: center;
              .iconfont {
                color: #6b8fc6;
              }
            }
            // &:first-child {
            //   margin-bottom: 18px;
            // }
          }
          .el-button {
            width: 100%;
            background-color: #4978bc;
            color: #fff;
          }
        }
      }
    }
  }
}

/* reset element-ui css */
// .login-container {
//   .el-input {
//     display: inline-block;
//     height: 47px;
//     width: 85%;

//     input {
//       background: transparent;
//       border: 0px;
//       -webkit-appearance: none;
//       border-radius: 0px;
//       padding: 12px 5px 12px 15px;
//       color: $light_gray;
//       height: 47px;
//       caret-color: $cursor;

//       &:-webkit-autofill {
//         box-shadow: 0 0 0px 1000px $bg inset !important;
//         -webkit-text-fill-color: $cursor !important;
//       }
//     }
//   }

//   .el-form-item {
//     border: 1px solid rgba(255, 255, 255, 0.1);
//     background: rgba(0, 0, 0, 0.1);
//     border-radius: 5px;
//     color: #454545;
//   }
// }
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

// .login-container {
//   min-height: 100%;
//   width: 100%;
//   background-color: $bg;
//   overflow: hidden;

//   .login-form {
//     position: relative;
//     width: 520px;
//     max-width: 100%;
//     padding: 160px 35px 0;
//     margin: 0 auto;
//     overflow: hidden;
//   }

//   .tips {
//     font-size: 14px;
//     color: #fff;
//     margin-bottom: 10px;

//     span {
//       &:first-of-type {
//         margin-right: 16px;
//       }
//     }
//   }

//   .svg-container {
//     padding: 6px 5px 6px 15px;
//     color: $dark_gray;
//     vertical-align: middle;
//     width: 30px;
//     display: inline-block;
//   }

//   .title-container {
//     position: relative;

//     .title {
//       font-size: 26px;
//       color: $light_gray;
//       margin: 0px auto 40px auto;
//       text-align: center;
//       font-weight: bold;
//     }
//   }

//   .show-pwd {
//     position: absolute;
//     right: 10px;
//     top: 7px;
//     font-size: 16px;
//     color: $dark_gray;
//     cursor: pointer;
//     user-select: none;
//   }
// }
</style>

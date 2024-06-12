<template>
  <div class="page-login">
    <div class="login-form">
      <h3 class="login-title">欢迎来到新世界</h3>
      <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" label-position="left">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            type="text"
            size="large"
            autocomplete="off"
            placeholder="账号"
          >
            <template #prefix
              ><svg-icon icon-class="user" class="el-input__icon input-icon"
            /></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            size="large"
            auto-complete="off"
            placeholder="密码"
            @keyup.enter="handleLogin(loginFormRef)"
          >
            <template #prefix
              ><svg-icon icon-class="password" class="el-input__icon input-icon"
            /></template>
          </el-input>
        </el-form-item>
        <el-checkbox v-model="loginForm.rememberMe" style="margin: 0px 0px 25px 0px"
          >记住密码</el-checkbox
        >
        <el-form-item style="width: 100%">
          <el-button
            :loading="loading"
            size="large"
            type="primary"
            style="width: 100%"
            @click.prevent="handleLogin(loginFormRef)"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup name="PageLogin">
import type { FormInstance } from 'element-plus'
import { ref, watch } from 'vue'
import useUserStore from '@/stores/modules/user'
import { useRoute, useRouter } from 'vue-router'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const loginFormRef = ref<FormInstance>()

const loading = ref(false)

const loginForm = ref({
  username: 'admin',
  password: 'admin123',
  rememberMe: false,
  code: '',
  uuid: ''
})

const loginRules = {
  username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
  code: [{ required: true, trigger: 'change', message: '请输入验证码' }]
}

const redirect = ref(undefined)

watch(
  route,
  (newRoute) => {
    redirect.value = newRoute.query && newRoute.query.redirect
  },
  { immediate: true }
)

const handleLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      // 调用action的登录方法
      userStore
        .login(loginForm.value)
        .then(() => {
          const query = route.query
          const otherQueryParams = Object.keys(query).reduce((acc, cur) => {
            if (cur !== 'redirect') {
              acc[cur] = query[cur]
            }
            return acc
          }, {})
          router.push({ path: redirect.value || '/', query: otherQueryParams })
        })
        .catch(() => {
          loading.value = false
          // 重新获取验证码
        })
    } else {
      console.log('error submit!')
    }
  })
}
</script>

<style lang="scss" scoped>
.page-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('@/assets/images/login-bg_1.jpg');
  background-size: cover;
  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 400px;
    padding: 25px 25px 5px 25px;
    .login-title {
      margin: 0px auto 30px auto;
      text-align: center;
      color: #707070;
    }
    .el-input {
      height: 40px;
      input {
        height: 40px;
      }
    }
    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 0px;
    }
  }
}
</style>

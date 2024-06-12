import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import defAva from '@/assets/images/profile.jpg'

interface UserInfo {
  username: string
  password: string
  code: string
  uuid: string
}

interface User {
  userId: string
  userName: string
  avatar: string
}

interface LoginResponse {
  token: string
}

interface GetInfoResponse {
  user: User
  roles: string[]
  permissions: string[]
}

const useUserStore = defineStore('user', () => {
  // State
  const token = ref<string | null>(getToken() as string)
  const id = ref<string>('')
  const name = ref<string>('')
  const avatar = ref<string>('')
  const roles = ref<string[]>([])
  const permissions = ref<string[]>([])

  // Actions
  const loginAction = async (userInfo: UserInfo): Promise<void> => {
    const username = userInfo.username.trim()
    const password = userInfo.password
    const code = userInfo.code
    const uuid = userInfo.uuid

    try {
      const res: LoginResponse = await login(username, password, code, uuid)
      setToken(res.token)
      token.value = res.token
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const getInfoAction = async (): Promise<GetInfoResponse> => {
    try {
      const res: GetInfoResponse = await getInfo()
      const user = res.user
      const userAvatar =
        user.avatar === '' || user.avatar == null
          ? defAva
          : import.meta.env.VITE_APP_BASE_API + user.avatar

      if (res.roles && res.roles.length > 0) {
        roles.value = res.roles
        permissions.value = res.permissions
      } else {
        roles.value = ['ROLE_DEFAULT']
      }

      id.value = user.userId
      name.value = user.userName
      avatar.value = userAvatar

      return res
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const logOutAction = async (): Promise<void> => {
    try {
      await logout()
      token.value = ''
      roles.value = []
      permissions.value = []
      removeToken()
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return {
    token,
    id,
    name,
    avatar,
    roles,
    permissions,
    login: loginAction,
    getInfo: getInfoAction,
    logOut: logOutAction
  }
})

export default useUserStore

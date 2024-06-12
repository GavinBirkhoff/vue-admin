export default [
  {
    url: '/mock-api/getInfo',
    method: 'get',
    response: () => {
      return {
        msg: '操作成功',
        code: 200,
        permissions: ['*:*:*'],
        roles: ['admin'],
        user: {
          searchValue: null,
          createBy: 'admin',
          createTime: '2023-11-29 21:39:51',
          updateBy: null,
          updateTime: null,
          remark: '管理员',
          params: {},
          userId: 1,
          deptId: 103,
          userName: 'admin',
          nickName: 'gavin',
          email: 'gavinbirkhoff@gmail.com',
          phonenumber: '15888888888',
          sex: '1',
          avatar: '',
          salt: null,
          status: '0',
          delFlag: '0',
          loginIp: '127.0.0.1',
          loginDate: '2024-06-07T13:57:26.000+08:00',
          roles: [
            {
              searchValue: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null,
              remark: null,
              params: {},
              roleId: 1,
              roleName: '超级管理员',
              roleKey: 'admin',
              roleSort: '1',
              dataScope: '1',
              menuCheckStrictly: false,
              deptCheckStrictly: false,
              status: '0',
              delFlag: null,
              flag: false,
              menuIds: null,
              deptIds: null,
              admin: true
            }
          ],
          roleIds: null,
          postIds: null,
          roleId: null,
          admin: true
        }
      }
    }
  },
  {
    url: '/mock-api/login',
    method: 'post',
    response: () => {
      return {
        msg: '操作成功',
        code: 200,
        token: 'mock-token'
      }
    }
  }
]

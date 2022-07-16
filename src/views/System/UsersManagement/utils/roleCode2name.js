// import { apiRolesList } from '@/api/roles.js'
// 前端需要保证这个映射是完整的
// todo: 进入用户管理页面时，从服务器端获取该映射
export const roleCode2name = {
  admin: {
    label: '管理员',
    tagType: 'success'
  },
  vip: {
    label: 'VIP用户',
    tagType: ''
  },
  user: {
    label: '用户',
    tagType: 'info'
  }
}

export const getRoleList = () => {
  // const serverRoleList = await apiRolesList()
  // return serverRoleList.map((item) => {
  //   return {
  //     value: item.roleCode,
  //     label: item.roleName
  //   }
  // })
  const res = []
  Object.keys(roleCode2name).forEach((key) => {
    res.push({ value: key, label: roleCode2name[key].label })
  })
  return res
}

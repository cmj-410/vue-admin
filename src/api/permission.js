import request from '@/utils/request'

// 获取全部权限树状结构
export const apiAllPermission = () => {
  return request({
    url: 'permissions/all-list',
    method: 'GET'
  })
}

// 更改权限状态
export const apiChangePermissionState = (data) => {
  return request({
    url: 'permissions/close-permission',
    method: 'POST',
    data
  })
}

// 增加权限
export const apiAddPermission = (data) => {
  return request({
    url: 'permissions/add-permission',
    method: 'POST',
    data
  })
}

// 删除权限
export const apiDeletePermission = ({ permissionCode }) => {
  return request({
    url: 'permissions/delete-permission',
    method: 'POST',
    data: { permissionCode }
  })
}

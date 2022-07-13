import request from '@/utils/request'

/**
 * 角色权限树在permission路由中
 */

/**
 * 获取角色列表
 */
export const apiRolesList = () => {
  return request({
    url: 'roles/list',
    method: 'GET'
  })
}

/**
 * 编辑角色信息
 */
export const apiEditUser = data => {
  return request({
    url: 'roles/operate',
    method: 'POST',
    data
  })
}

/**
 * 新增角色信息
 */
export const apiAddRole = data => {
  return request({
    url: 'roles/operate',
    method: 'POST',
    data: {
      ...data,
      action: 'add'
    }
  })
}

/**
 * 删除角色
 */
export const apiDeleteRole = data => {
  return request({
    url: 'roles/delete',
    method: 'POST',
    data
  })
}

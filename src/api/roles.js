import request from '@/utils/request'

/**
 * 获取角色信息
 */
export const apiRoleDetail = params => {
  return request({
    url: 'roles/detail',
    method: 'GET',
    params
  })
}

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
 * 删除用户
 */
export const apiDeleteRole = data => {
  return request({
    url: 'roles/delete',
    method: 'POST',
    data
  })
}

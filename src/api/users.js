import request from '@/utils/request'

/**
 * 登录
 */
export const apiLogin = data => {
  return request({
    url: '/users/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 */
export const apiUsersProfile = params => {
  return request({
    url: 'users/profile',
    method: 'GET',
    params
  })
}

/**
 * 获取用户列表
 */
export const apiUsersList = params => {
  return request({
    url: 'users/List',
    method: 'GET',
    params
  })
}

/**
 * 编辑用户信息
 */
export const apiEditUser = data => {
  return request({
    url: 'users/operate',
    method: 'POST',
    data
  })
}

/**
 * 新增用户信息
 */
export const apiAddUser = data => {
  return request({
    url: 'users/operate',
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
export const apiDeleteUser = data => {
  return request({
    url: 'users/delete',
    method: 'POST',
    data
  })
}

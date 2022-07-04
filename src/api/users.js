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
export const apiUsersProfile = userId => {
  return request({
    url: 'users/profile',
    method: 'GET',
    userId
  })
}

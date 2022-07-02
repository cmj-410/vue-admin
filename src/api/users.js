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

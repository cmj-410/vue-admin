import request from '@/utils/request'

export const apiAllPermission = () => {
  return request({
    url: 'permissions/all-list',
    method: 'GET'
  })
}

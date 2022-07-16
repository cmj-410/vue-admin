import request from '@/utils/request'

export const apiAllPermission = () => {
  return request({
    url: 'permissions/all-list',
    method: 'GET'
  })
}

export const apiChangePermissionState = (data) => {
  return request({
    url: 'permissions/close-permission',
    method: 'POST',
    data
  })
}

import { request } from '@/utils/request'

export const apiRolePermission = params => {
  return request({
    url: 'permissions/roleList',
    method: 'GET',
    params
  })
}

import request from '@/utils/request'

export function paperFilesListAPI(params) {
  return request({
    url: 'paperFiles/list',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function paperCategoryIndexAPI() {
  return request({
    url: 'paperCategory/index',
    method: 'get'
  })
}

/**
 * 上传文件
 * 上传文件  type 1 pdf论文，2 封面图片   file  上传的文件
 */
export function paperFilesUploadAPI(data) {
  var param = new FormData()
  Object.keys(data).forEach(key => {
    param.append(key, data[key])
  })
  return request({
    url: 'paperFiles/upload',
    method: 'post',
    data: param,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function paperFilesAddAPI(params) {
  return request({
    url: 'paperFiles/add',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function paperFilesDownAPI(url) {
  return request({
    url: url,
    method: 'post',
    responseType: 'blob'
  })
}

/*
 * @Description: 路由
 * @Author: bangdong.chen
 * @Date: 2020-03-07 17:07:46
 * @LastEditors: bangdong.chen
 * @LastEditTime: 2020-05-30 19:56:51
 * @FilePath: /fe-taro-jinxi/src/utils/getPath.js
 */

import projectConfig from '../../project.config.json'

export default ({ url, moduleName, params = {} }) => {
  if (moduleName) {
    if (projectConfig.projectname === moduleName) {
      return url
    }
    
    const query = []
    Object.keys(params).map((keyname) => {
      query.push(`${keyname}=${params[keyname]}`)
    })
    
    return `/packages/${moduleName}${url}?${query.join('&')}`
  }
  console.error({
    url,
    moduleName,
    msg: '请输入moduleName',
  });
  return null
}
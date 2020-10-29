/*
 * @Description: 路由
 * @Author: bangdong.chen
 * @Date: 2020-03-07 17:07:46
 * @LastEditors: bangdong.chen
 * @LastEditTime: 2020-10-29 22:10:21
 * @FilePath: /jd_sub_public/src/_gen/utils/getPath.js
 */

import projectConfig from '../../../project.config.json'

export default ({ url, moduleName, params = {} }) => {
  if (moduleName) {
    const query = []
    Object.keys(params).map((keyname) => {
      query.push(`${keyname}=${params[keyname]}`)
    })
    if (projectConfig.projectname === moduleName) {
      return `${url}?${query.join("&")}`;
    }
    return `/packages/${moduleName}${url}?${query.join('&')}`
  }
  console.error({
    url,
    moduleName,
    msg: '请输入moduleName',
  });
  return null
}
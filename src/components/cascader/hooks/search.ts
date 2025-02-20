import type { Idata_tree } from "@/types/Idata"

import data from '@/assets/data.json'
import { arrTotree } from "@/libs/arrTotree"

const tree = arrTotree(data)

export function Search() {
  /****通过adcode 查找
  * @description
  * @param adcode:string 
  * @param adcode:Idata_tree[]
  * @param res?:Idata_tree[] //用于递归传值
  * @returns res //递归得来的查询数组
   */
  function deep(adcode: string, data: Idata_tree[] = tree, res: Idata_tree[] = []): Idata_tree[] {
    for (let i of data) {
      if (adcode.includes(i.id) || i.id.includes(adcode)) {
        res.push(i)
        if (adcode === i.id) return res
        return i.children && deep(adcode, i.children, res)
      }
    }
    return []
  }
  /****模糊搜索
* @description
* @param string:string 
* @param data:Idata_tree[]
* @returns res //递归得来的Idata_tree[][]数组
 */
  function search(string: string, data: Idata_tree[] = tree) {
    let res: Idata_tree[][] = []
    dfs(data)

    function dfs(dataArr: Idata_tree[], temp: Idata_tree[] = []) {
      for (let i of dataArr) {
        temp.push(i)
        if (!i.ad_name.startsWith(string) && !string.startsWith(i.ad_name)) {
          i.children && dfs(i.children, temp)
        }
        else {
          res.push([...temp])
        }
        temp.pop()
      }
    }
    return res
  }

  return {
    deep, search
  }
}






import { ArticleDatabase } from "./index.mjs";
import fs from 'fs-extra'
// 使用示例
const db = new ArticleDatabase('./poetries.sqlite');
console.time("query")
console.log(db.search("黄鹤楼"))
console.timeEnd("query")
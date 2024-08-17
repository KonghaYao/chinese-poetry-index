
import { ArticleDatabase } from "./index.mjs";
import fs from 'fs-extra'
// 使用示例
const db = new ArticleDatabase('./poetries.sqlite');
const data = fs.readJSONSync('../../json/default.json')
for (const info of data) {
    if (!info.article) info.article = ''
    if (!info.author) info.author = ''
    db.insert(info)
}
// db.insert({
//     id: "article2" + Math.random(),
//     notes: 'This is a test note.',
//     title: '中文网字计划',
//     author: 'John Doe',
//     article: '中文网字计划1',
//     belongTo: '38492389',
//     belongToName: 'General'
// });
// console.log(db.search('中文网'))
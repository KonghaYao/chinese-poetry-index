// 上传至 meilisearch
import { MeiliSearch } from "meilisearch";
import fs from "fs-extra";

console.log(process.env.MEILI_MASTER_KEY);
const client = new MeiliSearch({
    host: "http://meilisearch:7700",
    apiKey: process.env.MEILI_MASTER_KEY,
});
const Index = client.index("poetry");

console.time("计算耗时");
for (let index = 0; index < 65; index++) {
    const files = await fs.readJSON(`./json/${index}.json`);
    await Index.addDocuments(files);
    console.log(index);
}

console.timeEnd("计算耗时");
console.log("完成任务");

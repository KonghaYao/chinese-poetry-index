// 上传至 meilisearch
import { MeiliSearch } from "meilisearch";
import fs from "fs-extra";

console.log(process.env.MEILI_MASTER_KEY);
const client = new MeiliSearch({
    host: "http://meilisearch:7700",
    apiKey: process.env.MEILI_MASTER_KEY,
});
const Index = client.index("poetry");
Index.updateSettings({
    filterableAttributes: ["belongToName", "author"],
    rankingRules: [
        "attribute",
        "typo",
        "exactness",
        "words",
        "proximity",
        "sort",
    ],
    distinctAttribute: "id",
    searchableAttributes: ["title", "author", "content", "id"],
});
console.time("计算耗时");
const items = await fs.readdir("./json");
for (let index of items) {
    const files = await fs.readJSON(`./json/${index}`);
    await Index.addDocuments(files);
    console.log(index);
}

console.timeEnd("计算耗时");
console.log("完成任务");

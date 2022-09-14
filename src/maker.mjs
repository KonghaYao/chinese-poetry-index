/**
 *
 * 转化原始仓库中的 json 为规范的 json 写法
 */
import AllData from "./transformer.mjs";
import fse from "fs-extra";
import { Tagger } from "./Tagger.mjs";
import { chunk } from "./chunk.mjs";
const root = "./node_modules/chinese-poetry/";

const prewrap = (data, template, base) => {
    data.tag = Tagger.gen(data);
    // 这个 base 是单个字符串，template 中有数组
    data.belongTo = base;
    data.belongToName = template.name;
    return data;
};

const processSingle = async (template, base) => {
    let data = await fse.readJson(root + (base || template.base));
    if (!Array.isArray(data)) {
        data = [data];
    }
    return data.flatMap((i) => {
        const done = template.transform(i);

        if (Array.isArray(done)) {
            let temp = done.map((ii) => prewrap(ii, template, base));
            done.length = 0;
            return temp;
        } else {
            return [prewrap(done, template, base)];
        }
    });
};
fse.emptyDirSync("./dist");
for (const template of AllData) {
    try {
        let originData = [];
        if (typeof template.base === "string") {
            originData = await processSingle(template, template.base);
        } else {
            await template.base.reduce((col, cur, index) => {
                return col.then(async (res) => {
                    const data = await processSingle(template, cur);
                    originData = originData.concat(data);
                });
            }, Promise.resolve());
        }
        let chain = Promise.resolve();
        // JSON 太大导致问题
        chunk(originData, 5000, (items, index) => {
            chain = chain.then(() =>
                fse.writeJSON(`./dist/${template.name}-${index}.json`, items)
            );
        });
        console.log(template.name);
    } catch (e) {
        console.log(e);
        console.log(template);
    }
}

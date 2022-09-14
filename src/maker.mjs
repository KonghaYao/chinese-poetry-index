/**
 *
 * 转化原始仓库中的 json 为规范的 json 写法
 */
import AllData from "./transformer.mjs";
import fse from "fs-extra";
import { Tagger } from "./Tagger.mjs";
const root = "./node_modules/chinese-poetry/";

const prewrap = (data, base) => {
    data.tag = Tagger.gen(data);
    data.belongTo = base;
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
            return done.map((ii) => prewrap(ii, base));
        } else {
            return [prewrap(done, base)];
        }
    });
};
fse.emptyDirSync("./dist");
AllData.map(async (template) => {
    try {
        let originData = [];
        if (typeof template.base === "string") {
            const data = await processSingle(template, template.base);

            originData.push(...data);
        } else {
            await template.base.reduce((col, cur) => {
                return col.then(async (res) => {
                    const data = await processSingle(template, cur);
                    originData.push(...data);
                });
            }, Promise.resolve());
        }

        await fse.writeJSON(`./dist/${template.name}.json`, originData);
    } catch (e) {
        console.log(e);
        console.log(template);
    }
});

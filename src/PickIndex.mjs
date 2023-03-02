import fs from "fs-extra";
const list = [];
for (let index = 0; index < 65; index++) {
    const files = await fs.readJSON(`./json/${index}.json`);
    files.forEach((element) => {
        const res = {
            id: element.id,
            title: element.title,
            author: element.author,
            belongToName: element.belongToName,
        };
        list.push(res);
    });
}
fs.outputJSON(`./data/indexes.json`, list);

import fs from "fs-extra";
const list = new Map();
for (let index = 0; index < 65; index++) {
    const files = await fs.readJSON(`./json/${index}.json`);
    files.forEach((element) => {
        const res = {
            id: element.id,
            title: element.title,
            author: element.author,
        };
        if (list.has(element.belongToName)) {
            list.get(element.belongToName).push(res);
        } else {
            list.set(element.belongToName, [res]);
        }
    });
}
[...list.entries()].forEach(([key, value]) => {
    fs.outputJSON(`../../data/indexes/${key}.json`, value);
});

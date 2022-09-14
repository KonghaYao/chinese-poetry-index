export const chunk = (info, size, cb) => {
    let num = Math.floor(info.length / size);
    while (num >= 0) {
        const json = info.slice(num * size, (num + 1) * size);
        cb(json, num);
        num--;
    }
};

import { v5 } from "uuid";
export const Tagger = {
    gen(i) {
        return v5(
            // title + content 并不能保证唯一性
            [i.title, i.subTitle, i.author, i.content.join("")].join(""),
            v5.URL
        );
    },
    // web 端才需要进行 match
    match(i, tag) {
        if (!i.tag) {
            i.tag = this.gen(i);
        }
        return i.tag === tag;
    },
};

/**
 * JSON 规范，所有的 json 格式都需要为
 * {
 *      tag: string, // 这个 json 对象的唯一值 * 这个属性将由系统统一生成
 *      title: string, // 标题
 *      content: string[] // 具体诗句列表 * 全文搜索将会转化为字符串
 *      belongTo: string // 具体的 JSON 文件路径
 *      subTitle?: string,
 *      author?: string, // 作者
 *      notes?: string[] // 脚注，用于底下注释用 * 不上传到全文搜索
 * }
 *
 */
import fse from "fs-extra";

/** 用于将 github 仓库中不规范的 json 转换为统一的 json 格式 */
export default [
    {
        base: fse
            .readdirSync("./node_modules/chinese-poetry/宋词")
            .filter((i) => i.startsWith("poet.song"))
            .map((i) => {
                return "json/" + i;
            }),

        name: "全宋词",
        transform(i) {
            return {
                title: i.title,
                author: i.author,
                content: i.paragraphs,
            };
        },
    },
    {
        base: "曹操诗集/caocao.json",
        name: "曹操诗集",
        // 将整个 json 文件 转化为 JSON 规范对象的数组
        transform(i) {
            // 这里不需要使用 tag、belongTo，系统自动生成
            return { title: i.title, content: i.paragraphs, author: "曹操" };
        },
    },
    {
        base: "楚辞/chuci.json",
        name: "楚辞",
        // 将整个 json 文件 转化为 JSON 规范对象的数组
        transform(i) {
            // 这里不需要使用 tag、belongTo，系统自动生成
            return {
                title: i.title,
                content: i.content,
                author: i.author,
                subTitle: i.section,
            };
        },
    },
    {
        base: "元曲/yuanqu.json",
        name: "元曲",
        // 将整个 json 文件 转化为 JSON 规范对象的数组
        transform(i) {
            // 这里不需要使用 tag、belongTo，系统自动生成
            return {
                title: i.title,
                author: i.author,
                content: i.paragraphs,
            };
        },
    },
    {
        base: "纳兰性德/纳兰性德诗集.json",
        name: "纳兰性德诗集",
        // 将整个 json 文件 转化为 JSON 规范对象的数组
        transform(i) {
            // 这里不需要使用 tag、belongTo，系统自动生成
            return {
                title: i.title,
                author: i.author,
                content: i.para,
            };
        },
    },
    {
        base: "论语/lunyu.json",
        name: "论语",
        // 将整个 json 文件 转化为 JSON 规范对象的数组
        transform(i) {
            // 这里不需要使用 tag、belongTo，系统自动生成
            return {
                title: i.chapter,
                content: i.paragraphs,
            };
        },
    },
    {
        base: "诗经/shijing.json",
        name: "诗经",
        transform(i) {
            return {
                title: i.title,
                subTitle: i.chapter + " " + i.section,
                content: i.content,
            };
        },
    },
    {
        base: [
            "四书五经/daxue.json",
            "四书五经/mengzi.json",
            "四书五经/zhongyong.json",
        ],
        name: "四书五经",
        transform(i) {
            return {
                title: i.chapter,
                content: i.paragraphs,
            };
        },
    },

    {
        base: fse
            .readdirSync("./node_modules/chinese-poetry/五代诗词/huajianji")
            .filter((i) => i.startsWith("huajianji"))
            .map((i) => {
                return "五代诗词/huajianji/" + i;
            }),
        rebase(path) {
            return path.replace("五代诗词/", "");
        },
        name: "花间集",
        transform(i) {
            return {
                title: i.title,
                author: i.author,
                // 舍弃 rhythmic 被包含在 title 中
                content: i.paragraphs,
                notes: i.notes,
            };
        },
    },
    {
        base: "五代诗词/nantang/poetrys.json",
        rebase(path) {
            return path.replace("五代诗词/", "");
        },
        name: "南唐二主词",
        transform(i) {
            return {
                title: i.title,
                author: i.author,
                // 舍弃 rhythmic 被包含在 title 中
                content: i.paragraphs,
                notes: i.notes,
            };
        },
    },
    {
        base: ["水墨唐诗/shuimotangshi.json",],
        name: "水墨唐诗",
        transform(i) {
            if (!('paragraphs' in i)) console.log(i)
            return {
                author: i.author,
                title: i.title,
                content: i.paragraphs,
                notes: [i.prologue]
            };
        },
    },
    {
        base: [
            "蒙学/sanzijing-traditional.json",
            "蒙学/sanzijing-new.json",
        ],
        name: "三字经",
        transform(i) {
            return {
                author: i.author,
                title: i.tags + i.title,
                content: i.paragraphs,
            };
        },
    },
    {
        base: ["蒙学/qianziwen.json"],
        name: "千字文",
        transform(i) {
            return {
                author: i.author,
                title: i.title,
                content: i.paragraphs,
            };
        },
    },
    {
        base: ["蒙学/baijiaxing.json"],
        name: "百家姓",
        transform(i) {
            return {
                title: i.title,
                author: i.author,
                content: i.paragraphs,
                notes: i.origin.map((i) => {
                    return `${i.surname} 来源于 ${i.place}`;
                }),
            };
        },
    },
    {
        base: ["蒙学/zhuzijiaxun.json"],
        name: "朱子家訓",
        transform(i) {
            return {
                title: i.title,
                author: i.author,
                content: i.paragraphs,
            };
        },
    },
    {
        base: ["蒙学/shenglvqimeng.json"],
        name: "声律启蒙",
        transform(i) {
            return i.content.map((ii) => {
                return {
                    title: i.title + "-" + ii.title,
                    content: ii.content.flatMap((item) => [
                        item.chapter,
                        ...item.paragraphs,
                    ]),
                };
            });
        },
    },
    {
        base: ["蒙学/wenzimengqiu.json"],
        name: "文字蒙求",
        transform(i) {
            return i.content.map((ii) => {
                return {
                    title: i.title + "-" + ii.title,
                    content: ii.paragraphs,
                };
            });
        },
    },
    {
        base: ["蒙学/zengguangxianwen.json"],
        name: "增廣賢文",
        transform(i) {
            return i.content.map((ii) => {
                return {
                    title: i.title + "-" + ii.chapter,
                    author: i.author,
                    content: ii.paragraphs,
                };
            });
        },
    },
    {
        base: ["蒙学/dizigui.json"],
        name: "弟子规",
        transform(i) {
            return i.content.map((ii) => {
                return {
                    title: i.title + "-" + ii.chapter,
                    author: i.author,
                    content: ii.paragraphs,
                };
            });
        },
    },

    {
        base: ["蒙学/guwenguanzhi.json"],
        name: "古文观止",
        transform(i) {
            return i.content.flatMap((ii) => {
                return ii.content.map((iii) => {
                    return {
                        title: i.title + "-" + ii.title + "-" + iii.chapter,
                        author: iii.author,
                        content: iii.paragraphs,
                    };
                });
            });
        },
    },
    {
        base: ["蒙学/youxueqionglin.json"],
        name: "幼学琼林",
        transform(i) {
            return i.content.flatMap((ii) => {
                return ii.content.map((iii) => {
                    return {
                        title: i.title + "-" + ii.title + "-" + iii.chapter,
                        author: i.author,
                        content: iii.paragraphs,
                    };
                });
            });
        },
    },
    {
        base: ["蒙学/qianjiashi.json"],
        name: "千家诗",
        transform(total) {
            return total.content.flatMap((ii) => {
                return ii.content.map((i) => {
                    return {
                        title: total.title + "-" + i.chapter,
                        author: i.author,
                        content: i.paragraphs
                            .map((i) => {
                                if (typeof i === "string") return i;
                                return [i.subchapter, i.subchapter];
                            })
                            .flat(),
                    };
                });
            });
        },
    },
    {
        base: ["蒙学/tangshisanbaishou.json"],
        name: "唐诗三百首",
        transform(total) {
            return total.content.flatMap((ii) => {
                return ii.content.map((i) => {
                    return {
                        title: total.title + "-" + i.chapter,
                        author: i.author,
                        content: i.paragraphs
                            .map((i) => {
                                if (typeof i === "string") return i;
                                return [i.subchapter, i.subchapter];
                            })
                            .flat(),
                    };
                });
            });
        },
    },
    {
        base: fse
            .readdirSync("./node_modules/chinese-poetry/全唐诗")
            .filter((i) => i.startsWith("poet.tang"))
            .map((i) => {
                return "全唐诗/" + i;
            }),

        name: "全唐诗",
        transform(i) {
            return {
                title: i.title,
                author: i.author,
                content: i.paragraphs,
            };
        },
    },
];

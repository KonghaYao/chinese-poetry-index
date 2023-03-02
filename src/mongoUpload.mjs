import mongoose from "mongoose";
import fs from "fs-extra";
// 上传至 mongoDB 主机, 注意，并不会跟随 Docker 打包
mongoose
    .connect(
        "mongodb+srv://player:aWjP1vRF4q5fj8rz@cluster1.xavvdnu.mongodb.net/poetry?retryWrites=true&w=majority", // 一些兼容配置，必须加，你不写运行的时候会提示你加。
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(async (db) => {
        const Poetry = new mongoose.Schema({
            title: { type: String },
            author: { type: String },
            belongToName: { type: String },
            belongTo: { type: String },
            content: { type: String },
            notes: { type: String },
            id: { type: String, required: true, index: true },
        });
        const _Poetry = mongoose.model("Poetry", Poetry);

        // ! 因为这里是按序码放，所以不能改动
        for (let index = 0; index < 65; index++) {
            const files = await fs.readJSON(`./json/${index}.json`);
            await _Poetry.insertMany(files, {
                ordered: true,
                bypassDocumentValidation: false,
                lean: true,
            });

            console.log(index);
            // break;
        }

        console.log("上传 MongoDB 完成");
        mongoose.disconnect();
    });

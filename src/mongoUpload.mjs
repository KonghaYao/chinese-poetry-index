import mongoose from "mongoose";
import fs from "fs-extra";
mongoose
    .connect(
        "mongodb://127.0.0.1:27017/poetry", // 一些兼容配置，必须加，你不写运行的时候会提示你加。
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(async () => {
        const Poetry = new mongoose.Schema({
            title: { type: String },
            author: { type: String },
            belongToName: { type: String },
            belongTo: { type: String },
            content: { type: String },
            notes: { type: String },
            id: { type: String, required: true },
        });
        const _Poetry = mongoose.model("Poetry", Poetry);
        for (let index = 0; index < 65; index++) {
            const files = await fs.readJSON(`./json/${index}.json`);
            await _Poetry.insertMany(files, {});
            console.log(index);
            // break;
        }

        console.log("上传 MongoDB 完成");
        mongoose.disconnect();
    });

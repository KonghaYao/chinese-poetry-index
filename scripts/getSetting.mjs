import { MeiliSearch } from "meilisearch";
const client = new MeiliSearch({
    host: "https://meilisearch-konghayao.cloud.okteto.net",
    apiKey: process.env.MEILI_MASTER_KEY,
});
const p = await client.index("poetry");
await p.getSettings().then((res) => console.log(res));

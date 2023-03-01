import { MeiliSearch } from "meilisearch";
const client = new MeiliSearch({
    host: "https://meilisearch-konghayao.cloud.okteto.net",
    apiKey: process.env.MEILI_MASTER_KEY,
});
client
    .createKey({
        description: "Add documents: Products API key2",
        actions: ["search", "documents.get"],
        indexes: ["id"],
        expiresAt: null,
    })
    .then((res) => console.log(res));

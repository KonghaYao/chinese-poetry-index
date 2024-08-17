import Database from "better-sqlite3";
export class ArticleDatabase {
    constructor(dbPath) {
        this.db = new Database(dbPath);
        this.createTable()
    }

    createTable() {
        this.db.loadExtension("./libsimple-osx-x64/libsimple.dylib");
        this.db.prepare("select jieba_dict(?)").run('./libsimple-osx-x64/dict/');
        const sql = `
            CREATE TABLE IF NOT EXISTS Articles (
                rowid INTEGER PRIMARY KEY AUTOINCREMENT,
                id TEXT NOT NULL UNIQUE,
                notes TEXT,
                title TEXT NOT NULL,
                author TEXT NOT NULL,
                article TEXT NOT NULL,
                belongTo TEXT NOT NULL,
                belongToName TEXT NOT NULL
            );
            CREATE VIRTUAL TABLE IF NOT EXISTS Articles_FTS USING fts5(title, article, id, tokenize = 'simple');`;
        this.db.exec(sql);
    }

    insert(article) {
        const sql = `
            INSERT INTO Articles (id, ${article.notes ? "notes," : ""} title, author, article, belongTo, belongToName)
            VALUES (@id, ${article.notes ? "@notes," : ""} @title, @author, @article, @belongTo, @belongToName);`;
        this.db.prepare(sql).run(article);
        this.db.prepare(`INSERT INTO Articles_FTS (id, title, article)
            VALUES (@id, @title, @article);`).run(article)
        return;
    }

    findById(id) {
        const sql = 'SELECT * FROM Articles WHERE id = ?;';
        return this.db.prepare(sql).get(id);
    }

    search(info, limit = 25) {
        const sql = `select simple_snippet(Articles_FTS, 0, '<b>', '</b>', '...', 100) as snippet, * from Articles_FTS where Articles_FTS match jieba_query(?) Order by rank limit ?;`;
        return this.db.prepare(sql).all(info, limit);
    }
}

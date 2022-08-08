class KVDatabases {
    private db: Map<string, string> = new Map();
    save(key: string, value: string) {
        this.db.set(key, value);
    }
}

class PersistentDB {
    savePersistent(data: Object) {
        console.log(data);
    }
}

class PersistentDBAdapter extends KVDatabases {
    constructor(public database: PersistentDB) {
        super();
    }

    override save(key: string, value: string): void {
        this.database.savePersistent({ key, value });
    }
}


function run(base: KVDatabases) {
    base.save('key', 'value')
}

run(new PersistentDBAdapter(new PersistentDB()));
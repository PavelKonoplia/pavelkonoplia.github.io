
// Create config for indexedDB
const config = {
    objectStore: 'ItemsStore',
    dataBase: `ItemsDatabase`,
    indesDBversion: 1
};

export class IndexedDBService {
    indexedDB;
    open;
    store;
    transaction;
    db;
    constructor() {
        this.indexedDB = window.indexedDB;

        this.Get = this.Get.bind(this);
        this.OpenStore = this.OpenStore.bind(this);
        this.Create = this.Create.bind(this);
        this.Delete = this.Delete.bind(this);

        this.OpenStore();
    }

    OpenStore() {
        this.open = this.indexedDB.open("ItemsDatabase", 1);

        this.open.onupgradeneeded = () => {
            this.db = this.open.result;
            this.store = this.db.createObjectStore("ItemsStore", { autoIncrement: true });
        };

    }

    Get(id, callback) {
        let request;
        this.OpenStore();
        this.open.onsuccess = () => {
            this.db = this.open.result;
            this.transaction = this.db.transaction("ItemsStore", "readwrite");
            this.store = this.transaction.objectStore("ItemsStore");

            request = this.store.get(id);
            request.onsuccess = function (event) {
                // callback(event.target.result);
                callback(request.result);
            }
            console.log(request);

            this.transaction.oncomplete = () => {
                this.db.close();
            };
        }
    }

    GetAll(callback) {
        let request;
        this.OpenStore();
        this.open.onsuccess = () => {
            this.db = this.open.result;
            this.transaction = this.db.transaction("ItemsStore", "readwrite");
            this.store = this.transaction.objectStore("ItemsStore");

            request = this.store.getAll();
            request.onerror = (error) => {
                // callback(event.target.result);
                console.log('you have error ' + error);
            }

            request.onsuccess = (event) => {
                // callback(event.target.result);
                callback(request.result);
            }

            this.transaction.oncomplete = () => {
                this.db.close();
            };
        }
    }

    Create(item) {
        this.OpenStore();
        this.open.onsuccess = () => {
            this.db = this.open.result;
            this.transaction = this.db.transaction("ItemsStore", "readwrite");
            this.store = this.transaction.objectStore("ItemsStore");

            this.store.put(item);

            this.transaction.oncomplete = () => {
                this.db.close();
            };
        }
        console.log(item);
    }

    Delete(id) {


    }

    Update(item) {


    }


}

export default new IndexedDBService();

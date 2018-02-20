import EventEmitter from '../common/event-emitter';

import config from '../config.json';

export class IndexedDBService {
    indexedDB;
    open;
    db;
    constructor() {
        this.indexedDB = window.indexedDB;
        this.OpenStore();
    }

    OpenStore() {
        this.open = this.indexedDB.open(config.dataBase, config.versionDB);

        this.open.onupgradeneeded = () => {
            this.db = this.open.result;
            this.db.createObjectStore(config.itemsStore, { keyPath: "Id" });
        };

        this.open.onsuccess = () => {
            this.db = this.open.result;
            EventEmitter.emit('initialized', { name: "ready" });
        }
    }

    Get(id, callback) {     

        let transaction = this.db.transaction(config.itemsStore, "readwrite");
        let itemStore = transaction.objectStore(config.itemsStore);

        let request = itemStore.get(id);
        request.onsuccess = function (event) {
            callback(request.result);
        }
    }

    GetAll(callback) {

        let transaction = this.db.transaction(config.itemsStore, "readwrite");
        let itemStore = transaction.objectStore(config.itemsStore);

        let request = itemStore.getAll();
        request.onerror = (error) => {
            console.log('you have error ' + error);
        }
        request.onsuccess = (event) => {
            callback(request.result);
        }
    }

    Create(item, callback) {

        let transaction = this.db.transaction(config.itemsStore, "readwrite");
        let itemStore = transaction.objectStore(config.itemsStore);

        itemStore.put(item);
        transaction.oncomplete = () => {
            this.GetAll(callback);
        };
    }

    Delete(item, callback) {

        let transaction = this.db.transaction(config.itemsStore, "readwrite");
        let itemStore = transaction.objectStore(config.itemsStore);
        
        itemStore.delete(item.Id);
        transaction.oncomplete = () => {
            this.GetAll(callback);
        };
    }

    Update(item, callback) {

        let getItems = (fn) => this.GetAll(fn);

        let transaction = this.db.transaction(config.itemsStore, "readwrite");
        let itemStore = transaction.objectStore(config.itemsStore);

        let request = itemStore.get(item.Id);
        request.onsuccess = function (event) {

            let data = event.target.result;
            data.Comments = item.Comments;

            var requestUpdate = itemStore.put(data);
            requestUpdate.onsuccess = function (event) {
                getItems(callback);
            };
        };
    }
}

export default new IndexedDBService();

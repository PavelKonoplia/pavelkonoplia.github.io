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
            this.db.createObjectStore(config.indexStore, { autoIncrement: true });
        };

        this.open.onsuccess = () => {
            this.db = this.open.result;
            EventEmitter.emit('initialized', { name: "ready" });
        }
    }

    Get(id, callback) {
        let request;
        let transaction = this.db.transaction(config.itemsStore, "readwrite");
        let itemStore = transaction.objectStore(config.itemsStore);

        request = itemStore.get(id);
        request.onsuccess = function (event) {
            callback(request.result);
        }
    }

    GetAll(callback) {
        let request;
        let transaction = this.db.transaction(config.itemsStore, "readwrite");
        let itemStore = transaction.objectStore(config.itemsStore);

        request = itemStore.getAll();
        request.onerror = (error) => {
            console.log('you have error ' + error);
        }
        request.onsuccess = (event) => {
            callback(request.result);
        }
    }

    GetIndex(callback) {
        let request;
        let transactionIndex = this.db.transaction(config.indexStore, "readwrite");
        let indexStore = transactionIndex.objectStore(config.indexStore);

        request = indexStore.getAll();
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

        let transactionIndex = this.db.transaction(config.indexStore, "readwrite");
        let indexStore = transactionIndex.objectStore(config.indexStore);

        let indexRequests = item.Id > 0 ? indexStore.delete(item.Id - 1) : indexStore.put(item.Id);
        indexRequests.onsuccess = (event) => {
            indexStore.put(item.Id);
        }

        itemStore.put(item);
        transaction.oncomplete = () => {
            this.GetAll(callback);
        };
    }

    Delete(item, callback) {
        let transaction = this.db.transaction(config.itemsStore, "readwrite");
        let itemStore = transaction.objectStore(config.itemsStore);
        debugger
        itemStore.delete(item.Id);
        transaction.oncomplete = () => {
            this.GetAll(callback);
        };
    }

    Update(item, callback) {

        let transaction = this.db.transaction(config.itemsStore, "readwrite");
        let itemStore = transaction.objectStore(config.itemsStore);
        let request = itemStore.get(item.Id);
        let getItems = (fn) => this.GetAll(fn);
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

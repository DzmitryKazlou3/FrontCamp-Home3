let _singletonUnificator = Symbol();

export default class Observable{
    constructor(singletonUnificator) {
        if (singletonUnificator !== _singletonUnificator) {
            throw "It is singleton please use Instance property instead";
        }

        this._observers = new Map();
    }

    static get Instance() {
        if(!Observable._instance){
            Observable._instance = new Observable(_singletonUnificator);
        }

        return Observable._instance;
    }

    addObserver(label, callback) {
        this._observers.has(label) || this._observers.set(label, []);
        this._observers.get(label).push(callback);
    }

    removeObserver(label, callback) {
        let observers = this._observers.get(label);
        let index;

        if (observers && observers.length) {
            index = observers.reduce((i, observer, index) => {
                return (isFunction(observer) && observer === callback) ?
                    i = index :
                    i;
            }, -1);

            if (index > -1) {
                observers.splice(index, 1);
                this._observers.set(label, observers);
                return true;
            }
        }
        return false;
    }

    emit(label, ...args) {
        let observers = this._observers.get(label);
        if (observers && observers.length) {
            observers.forEach((observer) => {
                observer(...args);
            });
            return true;
        }
        return false;
    }
}
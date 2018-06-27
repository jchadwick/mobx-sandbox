import { observable } from "mobx";

type Constructor<T> = new (...args: any[]) => T;

export enum StoreStatus {
    Unintialized,
    Loading,
    Loaded,
    Error,
}

export class RootStore {
    private stores = new Map();

    getStore<TStore extends BaseStore>(type: Constructor<TStore>): TStore {
        return this.stores.get(type) as TStore;
    }

    register<TStore extends BaseStore>(type: Constructor<TStore>, instance: TStore) {
        this.stores.set(type, instance);
        console.debug(`[RootStore] Registered store ${type.name}`);
    }
}

export class BaseStore {

    @observable status = StoreStatus.Unintialized;

    constructor(protected rootStore: RootStore) {
        rootStore.register((this as any).__proto__.constructor, this);
    }

}
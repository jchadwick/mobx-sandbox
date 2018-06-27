import { extendObservable } from "mobx";

export function createViewModel<T, U>(source: T, extensions: U): T & U {
    const vmExtensions = extendObservable({}, extensions);

    return new Proxy(source as any, {
        get(target, key) {
            return key in target ? Reflect.get(target, key) : Reflect.get(vmExtensions, key);
        },
        set(target, key, value) {
            if(key in target) {
                return Reflect.set(target, key, value);
            } else if(key in vmExtensions) {
                return Reflect.set(vmExtensions, key, value);
            } else {
                return false;
            }
        }
    })
}

export function defineViewModel<T, U>(ModelClass: new () => T, extensions: U): { new (source: T): T & U; wrap(source?: T): T & U } {
    const vmFactory = (source: T) => {
        if(source == null) { return null; }
        return createViewModel(source, extensions);
    }

    return class {
        constructor(source?: T) {
            return vmFactory(source);
        }

        static wrap(source?: T) {
            return vmFactory(source);
        }
    } as any;
}
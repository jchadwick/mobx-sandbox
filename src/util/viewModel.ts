import { extendObservable } from "mobx";
import { createViewModel, IViewModel } from "mobx-utils";

interface ViewModelClass<T, U> {
  new (source: T): T & U & IViewModel<T>;
  wrap(source?: T): T & U & IViewModel<T>;
}

export function extendViewModel<T, U>(source: T, extensions: U): T & U & IViewModel<T> {
  const vm = createViewModel(source);
  const vmExtensions = extendObservable({}, extensions);
  return Object.assign(vm, vmExtensions);
}

export function defineViewModel<T, U>(
  Model: new () => T,
  extensions: U
): ViewModelClass<T, U> {
  const vmFactory = (source: T) => {
    if (source == null) {
      return null;
    }
    return extendViewModel(source, extensions);
  };

  return class {
    constructor(source?: T) {
      return vmFactory(source);
    }

    static wrap(source?: T) {
      return vmFactory(source);
    }
  } as ViewModelClass<T, U>;
}

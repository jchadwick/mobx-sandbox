import { BaseStore, RootStore } from "./baseStore";
import { observable, action, computed } from "mobx";

export class RoutingStore extends BaseStore {
  @observable currentPath: string;
  @observable page: string;
  @observable view: string;
  @observable id: string;

  @computed
  get parts() {
    return this.currentPath.substr(1).split("/");
  }

  constructor(rootStore: RootStore) {
    super(rootStore);

    window.addEventListener("hashchange", this.syncRoute);
    this.syncRoute();
  }

  @action
  private syncRoute = () => {
    this.currentPath = document.location.hash.substr(1).toLowerCase();

    this.page = null;
    this.view = null;
    this.id = null;

    const parts = this.parts;

    switch (parts.length) {
      case 3:
        this.page = parts[0];
        this.view = parts[1];
        this.id = parts[2];
        break;

      case 2:
        this.page = parts[0];
        this.view = parts[1];
        break;

      case 1:
        this.page = parts[0];
        break;
    }

    console.debug(`[RoutingStore]::syncRoute - (${this.currentPath}) => ${this.page} / ${this.view} / ${this.id} `)
  };
}

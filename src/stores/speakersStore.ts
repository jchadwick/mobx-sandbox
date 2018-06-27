import { Speaker, Gender } from "../model";
import { BaseStore, StoreStatus } from "./baseStore";
import { IObservableArray, observable } from "mobx";
import { SessionsStore } from "./sessionsStore";
import { lazyObservable } from "mobx-utils";
import SpeakersService from "../services/speakersService";

export class SpeakersStore extends BaseStore {
  @observable speakers: IObservableArray<Speaker> = observable([]);

  load() {
    this.status = StoreStatus.Loading;

    const sessionsStore = this.rootStore.getStore(SessionsStore);

    if(sessionsStore.status === StoreStatus.Unintialized) {
        sessionsStore.load();
    }
    
    const speakers = SpeakersService.getAllSpeakers().map(x =>
      new Speaker(
        x,
        lazyObservable((sink) => sink(sessionsStore.getSessionsBySpeakerId(x.id)), [])
      )
    );

    this.speakers.replace(speakers);

    this.status = StoreStatus.Loaded;
  }
}

import { Session, Gender } from "../model";
import { BaseStore, StoreStatus } from "./baseStore";
import { SessionsApi } from "../services";
import { IObservableArray, observable, computed, IComputedValue, action } from "mobx";

export class SessionsStore extends BaseStore {
  @observable sessions: IObservableArray<Session> = observable([]);

  getSessionsBySpeakerId(speakerId: number): Session[] {
    return this.sessions.filter(x => x.speakerId === speakerId);
  }

  load() {
    this.status = StoreStatus.Loading;
    new SessionsApi()
      .sessionsGet_1()
      .then(sessions => sessions.map(session => new Session(session)))
      .then(sessions => this.sessions.replace(sessions))
      .then(() => (this.status = StoreStatus.Loaded));
  }
}

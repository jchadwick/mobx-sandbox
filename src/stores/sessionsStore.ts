import { Session, Gender } from "../model";
import { BaseStore, StoreStatus } from "./baseStore";
import SessionsService from "../services/sessionsService";
import { IObservableArray, observable, computed, IComputedValue, action } from "mobx";

export class SessionsStore extends BaseStore {
    @observable sessions: IObservableArray<Session> = observable([]);

    getSessionsBySpeakerId(speakerId: number): Session[] {
        return this.sessions.filter(x => x.speakerId === speakerId);
    }

    load() {
        this.status = StoreStatus.Loading;
        const sessions = SessionsService.getAllSessions().map((session) => new Session(session));
        this.sessions.replace(sessions);
        this.status = StoreStatus.Loaded;
    }
}
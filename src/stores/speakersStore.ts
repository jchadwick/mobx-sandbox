import { Speaker, Gender } from "../model";
import { BaseStore } from "./baseStore";
import { IObservableArray, observable } from "mobx";

const speakersStubData: Speaker[] = [
    [ "jess-chadwick", "Jess Chadwick", Gender.Male ],
    [ "todd-snyder", "Todd Synder", Gender.Male ],
    [ "suz-hinton", "Suz Hinton", Gender.Female ],
    [ "fish", "Fish", Gender.Complicated ],
].map(([key, name, gender], id) => Object.assign(new Speaker(), {
    id, key, name, gender
}));

export class SpeakersStore extends BaseStore {
    private speakers: IObservableArray<Speaker> = observable(speakersStubData);

    getSpeakers(): IObservableArray<Speaker> {
        return this.speakers;
    }
}
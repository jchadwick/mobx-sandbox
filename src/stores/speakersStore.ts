import { Speaker, Gender } from "../model";
import { BaseStore, StoreStatus } from "./baseStore";
import { IObservableArray, observable, computed, toJS } from "mobx";
import { SessionsStore } from "./sessionsStore";
import { lazyObservable, IViewModel } from "mobx-utils";
import { SpeakersApi } from "../services";

const ascending = (a, b) => a - b;
const descending = (a, b) => b - a;

export class SpeakersStore extends BaseStore {
  @observable speakers: IObservableArray<Speaker> = observable([]);

  getSpeakers({ page = 1, count = 10, sort = ascending, filter = null }) {
    const length = this.speakers.length;
    const start = Math.max((page - 1) * count, 0);
    const end = Math.min(start + count, length);

    return this.speakers
      .slice(0)
      .sort(sort)
      .slice(start, end)
      .filter(x => filter == null || new RegExp(filter, "i").test(x.name));
  }

  save(speaker: Speaker | IViewModel<Speaker>) {
    return new Promise(done => {
      if ("submit" in speaker && typeof speaker.submit === "function") {
        const speakerVm: IViewModel<Speaker> = speaker;
        speakerVm.submit();
        console.log(`[SpeakerStore]::Save(${JSON.stringify(toJS(speakerVm.model))})`);
      }
      done();
    });
  }

  load() {
    this.status = StoreStatus.Loading;

    const sessionsStore = this.rootStore.getStore(SessionsStore);

    if (sessionsStore.status === StoreStatus.Unintialized) {
      sessionsStore.load();
    }

    new SpeakersApi()
      .speakersGet()
      .then(speakers =>
        speakers.map(
          x =>
            new Speaker(
              x,
              lazyObservable(sink => sink(sessionsStore.getSessionsBySpeakerId(x.id)), [])
            )
        )
      )
    .then(speakers => this.speakers.replace(speakers))
    .then(() => this.status = StoreStatus.Loaded);
  }
}

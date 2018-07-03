import { Speaker, Gender } from "../model";
import { BaseStore, StoreStatus } from "./baseStore";
import { IObservableArray, observable, computed, toJS } from "mobx";
import { SessionsStore } from "./sessionsStore";
import { lazyObservable, IViewModel } from "mobx-utils";
import * as Api from "../services";
import { AppCache } from "../util/appCache";

const ascending = (a: Speaker, b: Speaker) => a && a.name.localeCompare(b && b.name);

export class SpeakersStore extends BaseStore {
  @observable speakers: IObservableArray<Speaker> = observable([]);

  query({ page = 1, count = 10, sort = ascending, filter = null }) {
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
    this.setSpeakers(this.loadCachedSpeakers());
    this.setSpeakers(this.retrieveSpeakers());
  }

  private setSpeakers(speakerPromise: Promise<Api.Speaker[]>) {
    const sessionsStore = this.rootStore.getStore(SessionsStore);

    if (sessionsStore.status === StoreStatus.Unintialized) {
      sessionsStore.load();
    }

    return speakerPromise
      .then(speakers =>
        speakers.map(
          x =>
            new Speaker(
              x,
              lazyObservable(
                sink => sink(sessionsStore.getSessionsBySpeakerId(x.id)),
                []
              )
            )
        )
      )
      .then(speakers => this.speakers.replace(speakers))
      .then(() => (this.status = StoreStatus.Loaded));
  }

  private retrieveSpeakers() {
    return new Api.SpeakersApi()
      .speakersGet()
      .then(speakers => speakers.filter(x => !!x && !!x.key && !!x.name && x.id > 0))
      .then(this.cacheSpeakers);
  }

  private loadCachedSpeakers() {
    return new Promise<Api.Speaker[]>((done) => {
      const speakers = AppCache.get<Api.Speaker[]>("speakers");
      done(speakers);
    });
  }

  private cacheSpeakers(speakers: Api.Speaker[]) {
    AppCache.set("speakers", speakers);
    return speakers;
  }
}

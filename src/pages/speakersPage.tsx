import * as React from "react";
import { Component } from "react";
import { SpeakerList } from "../components/speakers/speakerList";
import { SpeakersStore } from "../stores/speakersStore";
import { observer, inject } from "mobx-react";
import { observable, computed } from "mobx";
import { Speaker } from "../model";
import { SpeakerDetails } from "../components/speakers/speakerDetails";
import { SpeakerDetailsEditor } from "../components/speakers/speakerDetailsEditor";

@inject("speakersStore")
@observer
export class SpeakersPage extends Component<{ speakersStore?: SpeakersStore }, never> {
  @observable selectedSpeaker: Speaker;
  @observable filter: string;
  @observable mode: "view" | "edit" = "view";

  @computed
  get speakers() {
    return this.props.speakersStore.speakers
      .sort((a, b) => (a.name as any) - (b.name as any))
      .filter(x => this.filter == null || new RegExp(this.filter, "i").test(x.name));
  }

  componentDidMount() {
    this.props.speakersStore.load();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <p>
              <form className="form-inline">
                <div className="form-group">
                  <label>Search:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={this.filter}
                    onChange={evt => (this.filter = evt.target.value)}
                  />
                </div>
              </form>
            </p>
            <SpeakerList
              speakers={this.speakers}
              selectedSpeaker={this.selectedSpeaker}
              onSpeakerSelected={speaker => (this.selectedSpeaker = speaker)}
            />
          </div>

          <div className="col-md-9">
            <form className="form-inline">
              <div className="form-group">
                <label>Mode:</label>
                <select
                  className="form-control"
                  value={this.mode}
                  onChange={evt => (this.mode = evt.target.value as any)}
                >
                  <option value="view">View</option>
                  <option value="edit">Edit</option>
                </select>
              </div>
            </form>

            {this.selectedSpeaker == null 
              ? <div>Select a speaker</div>
              : (this.mode === "edit") 
                ? <SpeakerDetailsEditor speaker={this.selectedSpeaker} />
                : <SpeakerDetails speaker={this.selectedSpeaker} />
            }
          </div>
        </div>
      </div>
    );
  }
}

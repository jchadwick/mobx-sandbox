import * as React from "react";
import { Component } from "react";
import { SpeakerList } from "../components/speakers/speakerList";
import { SpeakersStore } from "../stores/speakersStore";
import { observer, inject } from "mobx-react";
import { observable, computed, action, reaction } from "mobx";
import { Speaker } from "../model";
import { SpeakerDetails } from "../components/speakers/speakerDetails";
import { SpeakerDetailsEditor } from "../components/speakers/speakerDetailsEditor";
import cn from "classnames";
import { FormGroup, InputFormField, DropDownFormField } from "../util/forms";
import { Pager } from "../util/pager";
import { IViewModel } from "mobx-utils";

@inject("speakersStore")
@observer
export class SpeakersPage extends Component<{ speakersStore?: SpeakersStore }, never> {
  @observable selectedSpeaker: Speaker;
  @observable filter: string;
  @observable mode: "view" | "edit" = "view";
  @observable currentPage: number = 1;

  @computed
  get speakers() {
    return this.props.speakersStore.getSpeakers({
      page: this.currentPage,
      filter: this.filter
    });
  }

  @computed
  get speakerCount() {
    return this.speakers.length;
  }

  @action nextPage = () => (this.currentPage += 1);

  @action previousPage = () => (this.currentPage -= 1);

  @action
  save(speaker: IViewModel<Speaker>) {
    this.props.speakersStore.save(speaker).then(_ => (this.mode = "view"));
  }

  componentDidMount() {
    reaction(
      () => this.currentPage,
      () => this.mode = "view"
    );

    reaction(
      () => this.selectedSpeaker,
      () => this.mode = "view"
    );

    this.props.speakersStore.load();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <p>
              <InputFormField model={this} field="filter" placeholder="Search..." />
            </p>

            <SpeakerList
              speakers={this.speakers}
              selectedSpeaker={this.selectedSpeaker}
              onSpeakerSelected={speaker => (this.selectedSpeaker = speaker)}
            />

            <div className="text-center">
              <Pager
                currentPage={this.currentPage}
                totalPages={this.speakerCount / 15}
                onPageChanged={page => (this.currentPage = page)}
              />
            </div>
          </div>

          <div className="col-md-9">
            {this.selectedSpeaker == null ? (
              <div>Select a speaker</div>
            ) : this.mode === "edit" ? (
              <SpeakerDetailsEditor
                speaker={this.selectedSpeaker}
                onCancel={() => this.mode = "view"}
                onSpeakerSaved={this.save}
              />
            ) : (
              <div>
                  <button
                    className="btn btn-warning pull-right"
                    onClick={() => (this.mode = "edit")}
                  >
                    Edit
                  </button>
                <SpeakerDetails speaker={this.selectedSpeaker} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

import * as React from "react";
import { Component } from "react";
import { SpeakerList } from "../components/speakers/speakerList";
import { SpeakersStore } from "../stores/speakersStore";
import { observer, inject } from "mobx-react";
import { observable, computed, action, reaction } from "mobx";
import { Speaker } from "../model";
import { SpeakerDetails } from "../components/speakers/speakerDetails";
import { SpeakerDetailsEditor } from "../components/speakers/speakerDetailsEditor";
import { FormGroup, InputFormField, DropDownFormField } from "../util/forms";
import { Pager } from "../util/pager";
import { IViewModel } from "mobx-utils";
import { StoreStatus } from "../stores/baseStore";
import { LoadingPanel } from "../util/loadingPanel";

@inject("speakersStore")
@observer
export class SpeakersPage extends Component<{ speakersStore?: SpeakersStore }, never> {
  @observable selectedSpeaker: Speaker;
  @observable filter: string;
  @observable mode: "view" | "edit" = "view";
  @observable currentPage: number = 1;
  @observable pageSize = 10;

  @computed
  get speakers() {
    return this.props.speakersStore.query({
      count: this.pageSize,
      page: this.currentPage,
      filter: this.filter
    });
  }

  @computed
  get totalSpeakersCount() {
    return this.props.speakersStore.speakers.length;
  }

  @computed
  get totalPages() {
    return Math.ceil(this.totalSpeakersCount / this.pageSize);
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
      <LoadingPanel loading={this.props.speakersStore.status === StoreStatus.Loading}>
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
                totalPages={this.totalPages}
                onPageChanged={page => (this.currentPage = page)}
              />
              <div>
                <small>{this.totalSpeakersCount} speakers in {this.totalPages} pages</small>
                </div>
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
      </LoadingPanel>
    );
  }
}

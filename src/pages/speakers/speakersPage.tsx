import * as React from "react";
import { Component } from "react";
import { SpeakerList } from "./speakerList";
import { SpeakersStore } from "../../stores/speakersStore";
import { observer, inject } from "mobx-react";
import { observable, computed } from "mobx";

@inject("speakersStore")
@observer
export class SpeakersPage extends Component<{ speakersStore?: SpeakersStore }, never> {

    @computed
    get speakers() {
        return this.props.speakersStore.getSpeakers();
    }

  render() {
    return (
    <div>
        <h2>Speakers</h2>
        <SpeakerList speakers={this.speakers} />
    </div>
    );
  }
}

import * as React from "react";
import { Component } from "react";
import { Speaker } from "../../model";
import { SessionsList } from "../sessions/sessionsList";
import { observer } from "mobx-react";

@observer
export class SpeakerDetails extends Component<{ speaker: Speaker }, never> {
  render() {
    const { speaker } = this.props;

    return (
      <div>
        <h2>{speaker.name}</h2>
        <div>
          <h3>Sessions</h3>
          <SessionsList sessions={speaker.sessions} />
        </div>
      </div>
    );
  }
}

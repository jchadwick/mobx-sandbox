import * as React from "react";
import { Component } from "react";
import { observer } from "mobx-react";
import { Speaker } from "../../model";

@observer
export class SpeakerList extends Component<{ speakers: Speaker[] }, never> {
  render() {
    const { speakers } = this.props;

    return (
      <ul>
        {speakers.map(speaker => 
          <li key={speaker.key}>
            <p>{speaker.name}</p>
            <button>Show Sessions</button>
          </li>)}
      </ul>
    );
  }
}

import * as React from "react";
import { Component } from "react";
import { observer } from "mobx-react";
import { Speaker } from "../../model";
import cn from "classnames";

interface SpeakerListProps {
  speakers: Speaker[];
  selectedSpeaker?: Speaker;
  onSpeakerSelected?: (speaker: Speaker) => void;
}

@observer
export class SpeakerList extends Component<SpeakerListProps, never> {

  isSelected = (speaker: Speaker) => speaker === this.props.selectedSpeaker;

  render() {
    const { speakers, onSpeakerSelected } = this.props;

    return (
      <ul className="list-group">
        {speakers.map(speaker => (
          <li
            className={cn("list-group-item", { active: this.isSelected(speaker) })}
            key={speaker.key}
            onClick={() => onSpeakerSelected(speaker)}
          >
            <div>{speaker.name}</div>
          </li>
        ))}
      </ul>
    );
  }
}

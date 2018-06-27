import * as React from "react";
import { Component } from "react";
import { Speaker, Gender } from "../../model";
import { observer } from "mobx-react";
import { computed } from "mobx";
import { defineViewModel } from "../../utils";

const InputFormField = ({ label, model, field }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="text"
        className="form-control"
        value={model[field]}
        onChange={evt => (model[field] = evt.target.value)}
      />
    </div>
  );
};

const SpeakerDetailsEditorVm = defineViewModel(Speaker, {
  showSessions: false
});

@observer
export class SpeakerDetailsEditor extends Component<{ speaker: Speaker }, never> {
  @computed
  get speaker() {
    return SpeakerDetailsEditorVm.wrap(this.props.speaker);
  }

  render() {
    const speaker = this.speaker;

    return (
      <div>
        <form>
          <InputFormField model={speaker} field={"key"} label="Key" />
          <InputFormField model={speaker} field={"gender"} label="Gender" />
          <InputFormField model={speaker} field={"name"} label="Name" />
          <InputFormField model={speaker} field={"biography"} label="Biography" />
          <InputFormField model={speaker} field={"avatarUrl"} label="Avatar" />
          <InputFormField model={speaker} field={"city"} label="City" />
          <InputFormField model={speaker} field={"state"} label="State" />
          <InputFormField model={speaker} field={"country"} label="Country" />
          <InputFormField model={speaker} field={"company"} label="Company" />
        </form>
      </div>
    );
  }
}

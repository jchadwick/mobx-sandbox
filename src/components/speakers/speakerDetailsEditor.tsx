import * as React from "react";
import { Component } from "react";
import { Speaker, Gender } from "../../model";
import { observer } from "mobx-react";
import { computed, action } from "mobx";
import { defineViewModel } from "../../util";
import { FormGroup, InputFormField, EnumDropDownFormField } from "../../util/forms";
import { VmDetails } from "../../util/vmDetails";
import cn from "classnames";
import { IViewModel } from "mobx-utils";

const SpeakerDetailsEditorVm = defineViewModel(Speaker, {
  showSessions: false
});

@observer
export class SpeakerDetailsEditor extends Component<
  { speaker: Speaker; onSpeakerSaved?: (speaker: IViewModel<Speaker>) => void },
  never
> {
  @computed
  get speaker() {
    return SpeakerDetailsEditorVm.wrap(this.props.speaker);
  }

  render() {
    const { onSpeakerSaved: triggerSave } = this.props;
    const speaker = this.speaker;

    return (
      <div>
        <div className="row">
          <form>
            <FormGroup label="Key" className="col-md-3">
              <InputFormField model={speaker} field={"key"} />
            </FormGroup>
            <FormGroup label="Name" className="col-md-4">
              <InputFormField model={speaker} field={"name"} />
            </FormGroup>
            <FormGroup label="Company" className="col-md-5">
              <InputFormField model={speaker} field={"company"} />
            </FormGroup>
            <FormGroup label="Gender" className="col-md-3">
              <EnumDropDownFormField model={speaker} field={"gender"} enumType={Gender} />
            </FormGroup>
            <FormGroup label="Avatar URL" className="col-md-9">
              <InputFormField model={speaker} field={"avatarUrl"} className="input-sm" />
            </FormGroup>
            <FormGroup label="Biography" className="col-md-12">
              <InputFormField model={speaker} field={"biography"} />
            </FormGroup>
            <FormGroup label="City" className="col-md-5">
              <InputFormField model={speaker} field={"city"} />
            </FormGroup>
            <FormGroup label="State" className="col-md-4">
              <InputFormField model={speaker} field={"state"} />
            </FormGroup>
            <FormGroup label="Country" className="col-md-3">
              <InputFormField model={speaker} field={"country"} />
            </FormGroup>
          </form>
        </div>

        <div className="row">
          <div className="col-md-12 text-right">
            <button
              onClick={() => triggerSave(speaker)}
              className={cn("btn btn-primary", { disabled: !speaker.isDirty })}
            >
              Save
            </button>
          </div>
        </div>

        <VmDetails viewModel={speaker} />
      </div>
    );
  }
}

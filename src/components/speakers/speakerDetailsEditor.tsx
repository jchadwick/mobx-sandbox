import * as React from "react";
import { Component } from "react";
import { Speaker, Gender } from "../../model";
import { observer } from "mobx-react";
import { computed, action } from "mobx";
import { defineViewModel } from "../../util";
import {
  FormGroup,
  InputFormField,
  EnumDropDownFormField,
  TextAreaFormField
} from "../../util/forms";
import { VmDetails } from "../../util/vmDetails";
import cn from "classnames";
import { IViewModel } from "mobx-utils";

const SpeakerDetailsEditorVm = defineViewModel(Speaker, {
  showSessions: false
});

interface SpeakerDetailsEditorProps {
  speaker: Speaker;
  onCancel?: () => void;
  onSpeakerSaved?: (speaker: IViewModel<Speaker>) => void;
}
@observer
export class SpeakerDetailsEditor extends Component<SpeakerDetailsEditorProps, never> {
  @computed
  get speaker() {
    return SpeakerDetailsEditorVm.wrap(this.props.speaker);
  }

  render() {
    const { onSpeakerSaved: triggerSave, onCancel: triggerCancel } = this.props;
    const speaker = this.speaker;

    return (
      <div>
        <div className="row">
          <form>
            <div className="row">
              <FormGroup label="Key" className="col-md-3">
                <InputFormField model={speaker} field={"key"} />
              </FormGroup>
              <FormGroup label="Name" className="col-md-4">
                <InputFormField model={speaker} field={"name"} />
              </FormGroup>
              <FormGroup label="Company" className="col-md-5">
                <InputFormField model={speaker} field={"company"} />
              </FormGroup>
            </div>

            <div className="row">
              <FormGroup label="Gender" className="col-md-3">
                <EnumDropDownFormField
                  model={speaker}
                  field={"gender"}
                  enumType={Gender}
                />
              </FormGroup>
              <FormGroup label="Avatar URL" className="col-md-9">
                <InputFormField
                  model={speaker}
                  field={"avatarUrl"}
                  className="input-sm"
                />
              </FormGroup>
            </div>

            <div className="row">
              <FormGroup label="City" className="col-md-5">
                <InputFormField model={speaker} field={"city"} />
              </FormGroup>
              <FormGroup label="State" className="col-md-4">
                <InputFormField model={speaker} field={"state"} />
              </FormGroup>
              <FormGroup label="Country" className="col-md-3">
                <InputFormField model={speaker} field={"country"} />
              </FormGroup>
            </div>

            <div className="row">
              <FormGroup label="Biography" className="col-md-12">
                <TextAreaFormField model={speaker} field={"biography"} />
              </FormGroup>
            </div>
          </form>
        </div>

        <div className="row">
          <div className="col-md-10" />
          <div className="col-md-1">
            <button
              onClick={() => triggerSave(speaker)}
              className={cn("btn btn-primary", { disabled: !speaker.isDirty })}
            >
              Save
            </button>
          </div>
          <div className="col-md-1">
            <button onClick={triggerCancel} className={"btn btn-default"}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

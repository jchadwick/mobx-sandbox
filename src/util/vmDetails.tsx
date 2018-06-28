import * as React from "react";
import { IViewModel } from "mobx-utils";
import { observer } from "mobx-react";

export const VmDetails = observer(({viewModel}: { viewModel: IViewModel<any> }) => {

    if(!viewModel.isDirty) { return null; }

    return (
        <div className="well">
            <label>Dirty Properties</label>
            <ul>
            {Object.keys(viewModel)
                .filter(key => viewModel.isPropertyDirty(key))
                .map(key => (
                <li key={key}>
                    {key} ({viewModel.model[key]} => {viewModel[key]})
                </li>
                ))}
            </ul>
        </div>
    );
})
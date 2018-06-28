import * as React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import cn from "classnames";

export const FormGroup = ({ label, children, className = "" }) => {
  return (
    <div className={cn(className, "form-group")}>
      <label>{label}</label>
      {children}
    </div>
  );
};

export const DropDownFormField = observer(({ model, field, values = null, className = "", children = null }) => {
  return (
    <select className={cn(className, "form-control")} value={model[field]} onChange={(evt: any) => model[field] = evt.target.value}>
      {values != null 
        ? values.map(val => <option key={val.value} value={val.value}>{val.name}</option>)
        : children
      }
    </select>
  );
});

export const EnumDropDownFormField = observer(({ model, field, enumType, className = "" }) => {
  return (
    <DropDownFormField model={model} field={field} className={className}>
    {Object.keys(enumType).filter((type) => isNaN(type as any)).map(name => (
      <option key={enumType[name]} value={enumType[name]}>{name}</option>
    ))}
    </DropDownFormField>
  );
});

export const InputFormField = observer(({ model, field = null, className = "", placeholder="" }) => {
  const updateValue = action((evt: any) => (model[field] = evt.target.value));
  return (
    <input
      type="text"
      className={cn(className, "form-control")}
      placeholder={placeholder}
      value={model[field] || ''}
      onChange={updateValue}
    />
  );
});

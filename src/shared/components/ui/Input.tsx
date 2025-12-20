import * as React from "react";

interface IPropsInput extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  htmlFor: string;
}

function Input(attributes: IPropsInput) {
  const { htmlFor, labelText, ...restAttributes } = attributes;
  return (
    <div>
      <label htmlFor={htmlFor}>{labelText}</label>
      <input {...restAttributes}/>
    </div>
  );
}

export default Input;

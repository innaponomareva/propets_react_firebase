import React from "react";

const Textarea = ({
  long,
  label,
  helpText,
  id,
  name,
  placeholder,
  value,
  onChange,
  onFocus,
  touched,
  error,
}) => {
  return (
    <div className="form-group-column">
      <label htmlFor={id} className="text-label">
        {label}
      </label>
      {helpText && <p className="help-text-green">{helpText}</p>}
      {touched && error && <div className="error-text">{error}</div>}
      <textarea
        className={long ? "textarea_long" : ""}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
      />
    </div>
  );
};

export default Textarea;

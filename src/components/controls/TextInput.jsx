import React from "react";

const TextInput = React.forwardRef(
  (
    {
      layout,
      type,
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
      disabled = false,
    },
    ref
  ) => {
    return (
      <div
        className={
          layout && layout === "column" ? "form-group-column" : "form-group-row"
        }
      >
        <label htmlFor={id} className="text-label">
          {label}
        </label>
        {layout === "column" && helpText && (
          <p className="help-text-green">{helpText}</p>
        )}
        <div style={{ width: "100%" }}>
          {touched && error && <div className="error-text">{error}</div>}
          <input
            ref={ref}
            id={id}
            type={type}
            name={name}
            className="form-control"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            disabled={disabled}
          />
        </div>
      </div>
    );
  }
);

export default TextInput;

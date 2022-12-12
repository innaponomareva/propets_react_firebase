import React, { Fragment } from "react";
import { Listbox } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import clsx from "clsx";

const DropdownListBox = ({
  options,
  value,
  name,
  onChange,
  placeholder,
  disabled,
}) => {
  return (
    <Listbox
      name={name}
      value={value}
      onChange={onChange}
      as="div"
      className="listbox"
    >
      {({ open }) => (
        <div>
          <Listbox.Button
            className={clsx("listbox-btn", disabled && "listbox-btn-disabled")}
          >
            {value ? (
              <p className="listbox-btn-value">{value}</p>
            ) : (
              <p className="listbox-btn-placeholder">{placeholder}</p>
            )}
            <FaChevronDown
              className={clsx(
                "listbox-btn-chevron",
                disabled && "listbox-btn-chevron-disabled",
                open ? "listbox-btn-chevron-up" : "listbox-btn-chevron-down"
              )}
            />
          </Listbox.Button>
          {!disabled && open && (
            <>
              <Listbox.Options className="listbox-options">
                {options.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    value={option}
                    disabled={disabled}
                    as={Fragment}
                  >
                    {({ selected }) => (
                      <li
                        className={clsx(
                          "listbox-option",
                          selected && "listbox-option-selected"
                        )}
                      >
                        {option}
                      </li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </>
          )}
        </div>
      )}
    </Listbox>
  );
};

const Dropdown = ({
  layout = "row",
  label,
  helpText,
  options,
  value,
  name,
  onChange,
  placeholder,
  touched,
  error,
  disabled = false,
}) => {
  return (
    <div
      className={clsx(
        layout === "column" ? "form-group-column" : "form-group-row"
      )}
    >
      <label htmlFor={label} className="text-label">
        {label}
      </label>
      {layout === "column" && helpText && (
        <p className="help-text-green">{helpText}</p>
      )}

      <div style={{ width: "100%" }}>
        {touched && error && <div className="error-text">{error}</div>}
        <DropdownListBox
          options={options}
          placeholder={placeholder}
          disabled={disabled}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Dropdown;

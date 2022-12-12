import React from "react";
import clsx from "clsx";

// color --> grey | green
const FileInput = ({ id, label, icon, name, onChange, color = "green" }) => {
  return (
    <div className="form-group-column">
      <label
        htmlFor={id}
        className={clsx(
          "custom-file-upload",
          color === "green" && "custom-file-upload-green",
          color === "grey" && "custom-file-upload-grey",
          label && "custom-file-upload-long"
        )}
      >
        {icon}
        {label}
        <input id={id} type="file" name={name} onChange={onChange} />
      </label>
    </div>
  );
};

export default FileInput;

import React, { useState, useRef } from "react";
import "./Editor.css";
const Editor = ({ onCreate }) => {
  const [value, setValue] = useState("");
  const contentRef = useRef();
  const onSubmit = () => {
    if (value === "") {
      contentRef.current.focus();
      return;
    }
    onCreate(value);
    setValue("");
  };

  const onChangeContent = (e) => {
    setValue(e.target.value);
  };

  const onKeyDown = (e) => {};

  return (
    <div className="Editor">
      <input
        placeholder="new Todo..."
        value={value}
        onKeyDown={onKeyDown}
        ref={contentRef}
        onChange={onChangeContent}
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;

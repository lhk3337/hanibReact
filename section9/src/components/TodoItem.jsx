import React, { useEffect, useRef, useState } from "react";
import "./TodoItem.css";
const TodoItem = ({ content, id, isDone, date, onUpdate, onDelete }) => {
  const editInputRef = useRef(null);
  const [isEdit, setIsEdit] = useState();
  const [upContent, setUpcontent] = useState(content);

  // useEffect(() => {
  //   if (content) {
  //     setUpcontent(content);
  //   }
  // }, [content]);

  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onClickDeleteButton = () => {
    onDelete(id);
  };

  const onClickUpdateButton = () => {
    if (!isDone) {
      onUpdate("_", upContent); // content text updated
      setIsEdit(!isEdit);
    }
  };

  const onChangeUpdate = (e) => {
    setUpcontent(e.target.value);
  };

  return (
    <div className="TodoItem">
      <input onChange={onChangeCheckbox} type="checkbox" readOnly checked={isDone} />
      {isEdit ? (
        <input type="text" value={upContent} ref={editInputRef} onChange={onChangeUpdate} />
      ) : (
        <div className={!isDone ? "content" : "cancelContent"}>{upContent}</div>
      )}
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickDeleteButton}>삭제</button>
      <button onClick={onClickUpdateButton}>수정</button>
    </div>
  );
};

export default TodoItem;

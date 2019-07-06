import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import TodoTextInput from "./TodoTextInput";

export default function TodoItem(props) {
  const [state, setState] = React.useState({ editing: false });
  const mergeState = data => setState(s => ({ ...s, ...data }));

  let handleDoubleClick = () => {
    mergeState({ editing: true });
  };

  let handleSave = (id, text) => {
    if (text.length === 0) {
      props.delete({ id });
    } else {
      props.edit({ id, text });
    }
    mergeState({ editing: false });
  };

  const { todo, complete, delete: deleteTodo } = props;

  let element;
  if (state.editing) {
    element = (
      <TodoTextInput
        text={todo.text}
        editing={state.editing}
        onSave={text => handleSave(todo.id, text)}
      />
    );
  } else {
    element = (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => complete({ id: todo.id })}
        />
        <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
        <button
          className="destroy"
          onClick={() => deleteTodo({ id: todo.id })}
        />
      </div>
    );
  }

  return (
    <li
      className={cx({
        completed: todo.completed,
        editing: state.editing
      })}
    >
      {element}
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  edit: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  complete: PropTypes.func.isRequired
};

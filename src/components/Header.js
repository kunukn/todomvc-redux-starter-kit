import React from "react";
import PropTypes from "prop-types";
import TodoTextInput from "./TodoTextInput";
import { todos } from "../ducks";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

const Header = () => {

  let dispatch = useDispatch();
  let add = text => dispatch(todos.actions.add(text))

  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo
        onSave={text => {
          text.length !== 0 && add({ text });
        }}
        placeholder="What needs to be done?"
      />
    </header>
  );
};
Header.propTypes = {};

export default Header;

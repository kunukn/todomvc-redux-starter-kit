import React from "react";
import PropTypes from "prop-types";
import TodoTextInput from "./TodoTextInput";
import { todos } from "../ducks";

const Header = ({ add }) => (
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

Header.propTypes = {
};

export default Header;

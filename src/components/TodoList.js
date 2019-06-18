import React from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";
import { todos } from "../ducks";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

const TodoList = ({ filteredTodos, actions }) => {




  return (
    <ul className="todo-list">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} {...actions} />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  filteredTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    })
  ),
  actions: PropTypes.object
};

export default TodoList;

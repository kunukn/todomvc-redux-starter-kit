import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import TodoItem from "./TodoItem";
import { todos } from "../ducks";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

const TodoList = () => {
  let filteredTodos = useSelector(state =>
    todos.selectors.getVisibleTodos(state)
  );

  let dispatch = useDispatch();
  let actions = bindActionCreators(todos.actions, dispatch);

  return (
    <ul className="todo-list">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} {...actions} />
      ))}
    </ul>
  );
};

TodoList.propTypes = {};

export default TodoList;

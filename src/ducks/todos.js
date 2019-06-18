import { createSlice, createSelector } from "redux-starter-kit";
import { visibilityFilter } from "./visibilityFilter";
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from "../constants/TodoFilters";

const { getVisibilityFilter } = visibilityFilter.selectors;

const uid = () => {
  let r = () => ("" + Math.random()).substr(2);
  let a = (+r()).toString(16);
  let b = (+r()).toString(16);
  return a + b;
};

const addTodo = (todos, action) => {
  return [
    ...todos,
    {
      id: uid(),
      completed: false,
      text: action.payload.text
    }
  ];
};

const deleteTodo = (state, action) =>
  state.filter(todo => todo.id !== action.payload.id);

const editTodo = (state, action) =>
  state.map(todo =>
    todo.id === action.payload.id
      ? { ...todo, text: action.payload.text }
      : todo
  );

const completeTodo = (state, action) =>
  state.map(todo =>
    todo.id === action.payload.id
      ? { ...todo, completed: !todo.completed }
      : todo
  );
const completeAllTodos = state => {
  const areAllMarked = state.every(todo => todo.completed);
  return state.map(todo => ({
    ...todo,
    completed: !areAllMarked
  }));
};

const clearCompleted = state => state.filter(todo => todo.completed === false);

const todos = createSlice({
  slice: "todos",
  initialState: [],
  reducers: {
    add: addTodo,
    delete: deleteTodo,
    edit: editTodo,
    complete: completeTodo,
    completeAll: completeAllTodos,
    clearCompleted: clearCompleted
  }
});

todos.selectors.getVisibleTodos = createSelector(
  [getVisibilityFilter, todos.selectors.getTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case SHOW_ALL:
        return todos;
      case SHOW_COMPLETED:
        return todos.filter(t => t.completed);
      case SHOW_ACTIVE:
        return todos.filter(t => !t.completed);
      default:
        throw new Error("Unknown filter: " + visibilityFilter);
    }
  }
);

todos.selectors.getCompletedTodoCount = createSelector(
  [todos.selectors.getTodos],
  todos =>
    todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0)
);

export { todos };

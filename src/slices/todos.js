import uuidv4 from 'uuid/v4';
import { createSlice, createSelector } from 'redux-starter-kit';
import { visibilityFilter } from './visibilityFilter';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
} from '../constants/TodoFilters';

const { getVisibilityFilter } = visibilityFilter.selectors;

const add = (state, action) => {
  console.log(action);

  return [
    ...state,
    {
      id: uuidv4(),
      completed: false,
      text: action.payload.text,
    },
  ];
};

const deleteTodo = (state, action) =>
  state.filter(todo => todo.id !== action.payload.id);

const edit = (state, action) =>
  state.map(todo =>
    todo.id === action.payload.id
      ? { ...todo, text: action.payload.text }
      : todo
  );

const complete = (state, action) =>
  state.map(todo =>
    todo.id === action.payload.id
      ? { ...todo, completed: !todo.completed }
      : todo
  );
const completeAll = (state, action) => {
  const areAllMarked = state.every(todo => todo.completed);
  return state.map(todo => ({
    ...todo,
    completed: !areAllMarked,
  }));
};

const clearCompleted = (state, action) => state.filter(todo => !todo.completed);

const todos = createSlice({
  slice: 'todos',
  initialState: [],
  reducers: {
    add,
    delete: deleteTodo,
    edit,
    complete,
    completeAll,
    clearCompleted,
  },
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
        throw new Error('Unknown filter: ' + visibilityFilter);
    }
  }
);

todos.selectors.getCompletedTodoCount = createSelector(
  [todos.selectors.getTodos],
  todos =>
    todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0)
);

export { todos };

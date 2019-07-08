import React from 'react';
import TodoTextInput from './TodoTextInput';
import { todos } from 'slices';
import { useDispatch } from 'react-redux';

const Header = ({ debug }) => {
  let dispatch = useDispatch();
  let add = text => dispatch(todos.actions.add(text));

  return (
    <header className="header">
      <h1>todos</h1>
      {debug > 0 && <div>debug: {debug}</div>}
      <TodoTextInput
        newTodo
        onSave={text => text.length && add({ text })}
        placeholder="What needs to be done?"
      />
    </header>
  );
};
Header.propTypes = {};

export default Header;

import React from "react";
import PropTypes from "prop-types";
import Footer from "./Footer";
import VisibleTodoList from "../containers/VisibleTodoList";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { todos } from "../ducks";

const MainSection = () => {
  const todosCount = useSelector(state => state.todos.length);
  const completedCount = useSelector(state =>
    todos.selectors.getCompletedTodoCount(state)
  );

  let actions = bindActionCreators(todos.actions, useDispatch());

  return (
    <section className="main">
      {todosCount > 0 && (
        <span>
          <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todosCount}
            readOnly
          />
          <label onClick={actions.completeAll} />
        </span>
      )}
      <VisibleTodoList />
      {todosCount > 0 && (
        <Footer
          completedCount={completedCount}
          activeCount={todosCount - completedCount}
          onClearCompleted={actions.clearCompleted}
        />
      )}
    </section>
  );
};

MainSection.propTypes = {};

export default MainSection;

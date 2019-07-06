import React from "react";
import Footer from "./Footer";
import TodoList from "../components/TodoList";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { todos } from "../ducks";

const MainSection = () => {
  const todosCount = useSelector(rootState => rootState.todos.length);
  
  const completedCount = useSelector(state =>
    todos.selectors.getCompletedTodoCount(state)
  );

  let dispatch = useDispatch();
  
  let actions = bindActionCreators( todos.actions, dispatch);



  // const actions = (() => {
  //   console.log("bindActionCreators", Date.now());
  //   return bindActionCreators(todos.actions, dispatch);
  // })();


  // const actions = React.useMemo(() => {
  //   console.log("useMemo", Date.now());
  //   return bindActionCreators(todos.actions, dispatch);
  // }, [dispatch]);

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
      <TodoList />
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

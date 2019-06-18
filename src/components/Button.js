import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { visibilityFilter } from "../ducks";

const { getVisibilityFilter } = visibilityFilter.selectors;
const { setVisibilityFilter } = visibilityFilter.actions;

const Button = ({ children, filter }) => {
  const active = useSelector(state => filter === getVisibilityFilter(state));
  const dispatch = useDispatch();

  //let setFilter = () => void dispatch(setVisibilityFilter(filter));
  const setFilter = React.useCallback(
    () => dispatch(setVisibilityFilter(filter)),
    [dispatch]
  );

  return (
    <button
      type="button"
      className={classnames({ selected: active })}
      style={{ cursor: "pointer" }}
      onClick={setFilter}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired
};

export default Button;

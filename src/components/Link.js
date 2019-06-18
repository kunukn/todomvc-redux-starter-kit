import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { visibilityFilter } from "../ducks";

const { getVisibilityFilter } = visibilityFilter.selectors;
const { setVisibilityFilter } = visibilityFilter.actions;

const Link = ({ children, filter }) => {
  const active = useSelector(state => filter === getVisibilityFilter(state));
  const dispatch = useDispatch();

  let setFilter = () => void dispatch(setVisibilityFilter(filter));

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      className={classnames({ selected: active })}
      style={{ cursor: "pointer" }}
      onClick={() => setFilter()}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Link;

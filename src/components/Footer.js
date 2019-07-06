import React from "react";
import PropTypes from "prop-types";
import Link from "../components/Link";
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from "../constants/TodoFilters";

const FILTER_TITLES = {
  [SHOW_ALL]: "All",
  [SHOW_ACTIVE]: "Active",
  [SHOW_COMPLETED]: "Completed"
};

const Footer = ({ activeCount, completedCount, onClearCompleted }) => {
  const itemWord = activeCount === 1 ? "item" : "items";
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount || "No"}</strong> {itemWord} left
      </span>
      <ul className="filters">
        {Object.keys(FILTER_TITLES).map(filter => (
          <li key={filter}>
            <Link filter={filter}>{FILTER_TITLES[filter]}</Link>
          </li>
        ))}
      </ul>
      {completedCount > 0 && (
        <button className="clear-completed" onClick={_ => onClearCompleted()}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired
};

export default Footer;

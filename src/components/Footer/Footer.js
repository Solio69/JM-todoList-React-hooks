import React from 'react';
import './Footer.css';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter/TasksFilter';

const Footer = function ({ taskCount, itemStatusFilter, onFilterChange, clearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{taskCount} items left</span>
      <TasksFilter itemStatusFilter={itemStatusFilter} onFilterChange={onFilterChange} />
      <button className="clear-completed" type="button" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  itemStatusFilter: 'all',
  taskCount: null,
};

Footer.propTypes = {
  itemStatusFilter: PropTypes.string,
  taskCount: PropTypes.number,
  onFilterChange: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default Footer;

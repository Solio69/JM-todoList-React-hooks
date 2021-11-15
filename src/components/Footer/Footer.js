import React from 'react';
import './Footer.css';
// import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter/TasksFilter';

const Footer = ({ taskCount, itemStatusFilter, onFilterChange, clearCompleted }) => (
  <footer className="footer">
    <span className="todo-count">{taskCount} items left</span>
    <TasksFilter itemStatusFilter={itemStatusFilter} onFilterChange={onFilterChange} />
    <button className="clear-completed" type="button" onClick={clearCompleted}>
      Clear completed
    </button>
  </footer>
);


export default Footer;

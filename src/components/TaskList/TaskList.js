import React from 'react';
import './TaskList.css';
import PropTypes from 'prop-types';
import Task from '../Task/Task';

const TaskList = function ({ todos, onDeleted, onToggleDone, onToggleEdit, addEditedItem, changeTimer }) {
  // console.log(TaskList.defaultProps)

  const elements = todos.map((item, i) => {
    const { id } = item;

    return (
      <Task
        item={item}
        key={id}
        index={i}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => {
          onToggleDone(id);
        }}
        onToggleEdit={() => {
          onToggleEdit(id);
        }}
        addEditedItem={addEditedItem}
        changeTimer={changeTimer}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};
TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  addEditedItem: PropTypes.func.isRequired,
  changeTimer: PropTypes.func.isRequired,
};

export default TaskList;

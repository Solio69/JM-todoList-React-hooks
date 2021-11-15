import React from 'react';
import './TaskList.css';
// import PropTypes from 'prop-types';
import Task from '../Task/Task';

const TaskList = ({ todos, onDeleted, onToggleDone, onToggleEdit, addEditedItem, changeTimer }) => {
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

export default TaskList;

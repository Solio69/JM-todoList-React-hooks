import React from 'react';
import './TasksFilter.css';
// import PropTypes from 'prop-types';


const TasksFilter =({ itemStatusFilter, onFilterChange })=>{
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  // отображает кнопки
  const displayButtons = buttons.map(({ name, label }) => {
    // если установлен фильтр и он соответсвтует name
    const isActive = itemStatusFilter === name;

    // то добавляем класс активной кнопки
    const className = isActive ? 'selected' : '';

    return (
      <li key={name}>
        <button className={className} type="button" 
        // следит за кликом по кнопке, передает инфо о выбранной родителю 
        onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });
  return <ul className="filters">{displayButtons}</ul>;
}

export default TasksFilter;



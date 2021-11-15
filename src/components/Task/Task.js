import './Task.css';
// import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
// import PropTypes from 'prop-types';
import Timer from '../Timer/Timer';

const Task = ({ onDeleted, onToggleEdit, onToggleDone, item, changeTimer, addEditedItem })=> {

  const { label, dateСreation, completed, editing, timerData, id } = item;

  // обновляет label 
  const updateLabel = (event)=>{
    const newItem = { ...item };
    newItem.label = event.target.value;
    newItem.editing = false;
    // вызывает ф-ю обновления элемента
    addEditedItem(id, newItem);
  }

  // при потере фокуса с input
  const onBlur = (event) =>{
    updateLabel(event)
  };
 
  // при нажатии Enter
  const onKeyPress=(event) => {
    if (event.key === 'Enter') {
      updateLabel(event)
    }
  };

  // превращем строку обатно в объект
  const dateObj = new Date(dateСreation);
  // возвращает строку с информацией сколько минут/секунд назад создан Task
  const wasCreated = formatDistanceToNow(dateObj, { includeSeconds: true }, { addSuffix: true });

  let className = '';

  if (completed) {
    className += ' completed';
  }

  if (editing) {
    className += ' editing';
  }

  return (
    <li className={className}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={!!completed} onChange={onToggleDone} />
        <label>
          <span className="title">{label}</span>
          <Timer changeTimer={changeTimer} timerData={timerData} id={id} />
          <span className="created">created {wasCreated} ago</span>
        </label>
        <button className="icon icon-edit" type="button" aria-label="Icon input edit" onClick={onToggleEdit} />
        <button className="icon icon-destroy" type="button" aria-label="Icon input deleted" onClick={onDeleted} />
      </div>
      <input
        type="text"
        className="edit"
        defaultValue={label}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
      />
    </li>
  );

}
export default Task;
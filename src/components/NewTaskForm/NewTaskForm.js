// import React, { Component } from 'react';
import React, { useState } from 'react';
import './NewTaskForm.css';
// import PropTypes from 'prop-types';

const NewTaskForm =({onItemAdded })=>{

  //по умолчанию label пустая строка
  const [label, setOnLabelChange] = useState('');
  
  // следит за value в input и изменяет State
  const onChange = (event)=>{
    setOnLabelChange(event.target.value)
  }

  // по событию onSubmit передает измененный label родителю
  const onSubmit = (event) => {
    event.preventDefault();
    onItemAdded(label);
    // изменяет State
    setOnLabelChange('')
  };

  return(
    <form onSubmit={onSubmit} className="new-todo-form">
      <input className="new-todo" placeholder="What needs to be done?" onChange={onChange} value={label} />
    </form>
  )
}

export default NewTaskForm;

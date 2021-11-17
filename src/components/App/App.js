import React, { useState } from 'react';
import './App.css';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

const App = function() {

  // если в localStorage есть данные, то устанавливает значение из localStorage, если нет, то пустой массив
  const [todoData, setTodoData]= useState(JSON.parse(localStorage.getItem('todoData')) || [])

  // если в localStorage есть данные, то устанавливает значение из localStorage, если нет, то 'all'
  const [filter, setFilter]= useState(JSON.parse(localStorage.getItem('filter')) || 'all')

  const createTodoItem =(label) =>{
    const str = String(new Date());

    return {
      label,
      completed: false,
      editing: false,
      dateСreation: str,
      id: Math.floor(Math.random() * (1000 - 1) + 1),
      timerData: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        intervalId: 0,
      },
    };
  }

  // добавляет элемент в список
  const addItem = (text) => {
    const newItem = createTodoItem(text);
    const newArr = [...todoData];
    newArr.push(newItem);
    return setTodoData([...newArr])
  };

  // удаляет элемент списка
  const deleteItem = (id) => {
    const ind = todoData.findIndex((el) => el.id === id);
    // eslint-disable-next-line id-length
    const newArr = todoData.filter((_, index) => index !== ind);
    return setTodoData([...newArr])
  };

  // обновляет свойства элемента
  const toggleProperties = (arr, id, propertyName) => {
    const ind = arr.findIndex((el) => el.id === id);
    const newArr = [...arr];
    newArr[ind][propertyName] = !newArr[ind][propertyName];
    return newArr;
  };

  // обновляет список с учетом выполненный tasks
  const onToggleDone = (id) => {
    setTodoData([...toggleProperties(todoData, id, 'completed')])
  };

  // обновляет список с учетом отредактированный tasks
  const addEditedItem = (id, updateItem) => {
    const newArr = [...todoData];
    const ind = newArr.findIndex((el) => el.id === id);
    newArr[ind] = updateItem;
    return setTodoData([...newArr])
  };

  // обновляет список с учетом радактируемых в данный момент tasks
  const onToggleEdit = (id) => {
    setTodoData([...toggleProperties(todoData, id, 'editing')])
  };

  const changeTimer = (id, updatTimerData) => {
    const newArr = [...todoData];
    const ind = newArr.findIndex((el) => el.id === id);
    newArr[ind].timerData = updatTimerData;
    return setTodoData([...newArr])
      
  };

  // изменяет значение свойства filter
  const onFilterChange = (filterName) => {
    setFilter(filterName)
  };

  // удаляет все выполненные tasks
  const clearCompleted = () => setTodoData([...todoData].filter((item) => !item.completed));

  // фильтры 
  // eslint-disable-next-line no-shadow
  const filters = (arr, filter) => {
    switch (filter) {
      case 'all':
        return arr;
      case 'completed':
        return arr.filter((item) => item.completed);
      case 'active':
        return arr.filter((item) => !item.completed);
      default:
        return arr;
    }
  };

  // отфильтрованные элементы
  const filtersItems = filters(todoData, filter);

  // счетчик невыполненных задач
  const tasksLeftCount = todoData.filter((el) => !el.completed).length;

  // изменяет localStorage
  localStorage.setItem('todoData', JSON.stringify(todoData));
  localStorage.setItem('filter', JSON.stringify(filter));

  return(
    <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm 
            onItemAdded={addItem}
           />
        </header>
        <section className="main">
          <TaskList
            todos={filtersItems}
            onDeleted={deleteItem}
            onToggleDone={onToggleDone}
            onToggleEdit={onToggleEdit}
            addEditedItem={addEditedItem}
            changeTimer={changeTimer}
          />
          <Footer
            taskCount={tasksLeftCount}
            itemStatusFilter={filter}
            onFilterChange={onFilterChange}
            clearCompleted={clearCompleted}
          />
        </section>
      </section>
  )
}
export default App;

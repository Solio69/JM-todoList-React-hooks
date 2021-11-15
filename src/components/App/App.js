import React, { Component } from 'react';
import './App.css';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

export default class App extends Component {
  state = {
    todoData: JSON.parse(localStorage.getItem('todoData')) || [],

    filter: JSON.parse(localStorage.getItem('filter')) || 'all', // all, active, !completed
  };

  // удаляет элемент списка
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const ind = todoData.findIndex((el) => el.id === id);
      // eslint-disable-next-line id-length
      const newArr = todoData.filter((_, index) => index !== ind);

      return {
        todoData: newArr,
      };
    });
  };

  // добавляет элемент в список
  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData];
      newArr.push(newItem);
      return {
        todoData: newArr,
      };
    });
  };

  // обновляет список с учетом выполненный tasks
  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperties(todoData, id, 'completed'),
    }));
  };

  // обновляет список с учетом радактируемых в данный момент tasks
  onToggleEdit = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperties(todoData, id, 'editing'),
    }));
  };

  // обновляет свойства элемента
  toggleProperties = (arr, id, propertyName) => {
    const ind = arr.findIndex((el) => el.id === id);
    const newArr = [...arr];
    newArr[ind][propertyName] = !newArr[ind][propertyName];
    return newArr;
  };

  // обновляет список с учетом отредактированный tasks
  addEditedItem = (id, updateItem) => {
    this.setState(({ todoData }) => {
      const newArr = [...todoData];
      const ind = newArr.findIndex((el) => el.id === id);
      newArr[ind] = updateItem;
      return {
        todoData: newArr,
      };
    });
  };

  // изменяет значение свойства filter
  onFilterChange = (filterName) => {
    this.setState({ filter: filterName });
  };

  // удаляет все выполненные tasks
  clearCompleted = () => {
    this.setState(({ todoData }) => ({
      todoData: [...todoData].filter((item) => !item.completed),
    }));
  };

  filters = (arr, filter) => {
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

  changeTimer = (id, updatTimerData) => {
    this.setState(({ todoData }) => {
      const newArr = [...todoData];
      const ind = newArr.findIndex((el) => el.id === id);
      newArr[ind].timerData = updatTimerData;
      return {
        todoData: newArr,
      };
    });
  };

  // создает новый элемент списка
  createTodoItem(label) {
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

  render() {
    const { todoData, filter } = this.state;

    // счетчик невыполненных задач
    const tasksLeftCount = todoData.filter((el) => !el.completed).length;

    // отфильтрованные элементы
    const filtersItems = this.filters(todoData, filter);

    // изменяет localStorage
    localStorage.setItem('todoData', JSON.stringify(todoData));
    localStorage.setItem('filter', JSON.stringify(filter));

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={filtersItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onToggleEdit={this.onToggleEdit}
            addEditedItem={this.addEditedItem}
            changeTimer={this.changeTimer}
          />
          <Footer
            taskCount={tasksLeftCount}
            itemStatusFilter={filter}
            onFilterChange={this.onFilterChange}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}

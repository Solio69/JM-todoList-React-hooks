/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Timer = function({timerData,changeTimer, id}) {
  const [time, setTime]= useState({
    hours: 9,
    minutes: 59,
    seconds: 0,
  })
  const [intervalId, setIntervalId] = useState(0);

  // устанавливает в таймер занчения из timerData и очищает интервал при размонтировании
  useEffect(() => {
    setTime({...timerData})
    return () => {
      clearInterval(intervalId);
    };
  }, [timerData,intervalId]);

  // обновляемые знаение time
  let updateSec = time.seconds;
  let updateMin = time.minutes;
  let updateHours = time.hours

  // изменяет time
  const run =()=>{
   
    if(updateSec < 59){
      updateSec++
    } else {
      updateMin++
      updateSec = 0

      if (updateMin < 59) {
      updateMin++
      } else {
        updateHours++
        updateMin= 0
      }
    }
    // возвращает новызначения time
    return setTime({...time, seconds:updateSec, minutes: updateMin, hours:updateHours})
  }

  // включить таймер 
  const startTimer = () => {

    // очищаем setInterval если он уже запущен
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
    }

    const newIntervalId = setInterval(() => {
      run()
    }, 1000);

    // записываем в intervalId результат выполнения ф-и newIntervalId
    setIntervalId(newIntervalId);
  };

  // остановить таймер
  const stopTimer = () => {

    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
    }

    // при остановке таймера передаем его данные в родителю
    changeTimer(id, time);
  };


  // приобразует строки вывода таймера
  const strOutput = (val) => {
    const newStr = String(val);
    return newStr.length === 1 ? `0${  newStr}` : newStr;
  };

  // приобразованные строки с значениями time
  const secondsOutput = strOutput(time.seconds);
  const minutesOutput = strOutput(time.minutes);
  const hoursOutput = strOutput(time.hours);

  return(
      <span className="description" >
        <button className="icon icon-play" type="button" aria-label="icon-play " 
        onClick={startTimer} 
        />
        <button className="icon icon-pause" type="button" aria-label="icon-pause" 
        onClick={stopTimer} 
        />
        {hoursOutput}:{minutesOutput}:{secondsOutput}
      </span>
  )
}
Timer.propTypes  = {
  id: PropTypes.number.isRequired,
  timerData: PropTypes.shape({
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
    intervalId: PropTypes.number,
  }),
  changeTimer: PropTypes.func.isRequired,
}

Timer.defaultProps ={
  timerData: {
    hours: 0,
    minutes: 0,
    seconds: 0,
  }
}



export default Timer;



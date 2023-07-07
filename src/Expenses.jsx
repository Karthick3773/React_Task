import { format } from 'date-fns';
import React, { useState } from 'react'

export const Expenses = () => {
  const [previousValue, setPreviousValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(false);


  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (isNaN(inputValue)) {
      setError(true);
      setCurrentValue(0);
    } else {
      setError(false);
      setCurrentValue(Number(inputValue));
    }
  };

  const handleAdd = (buttonId) => {
    const sum = previousValue + currentValue;
    setPreviousValue(sum);
    setCurrentValue(0);
    addToHistory(buttonId);
  };


  const handleRemove = (buttonId) =>{
    const sum = previousValue - currentValue;
    setPreviousValue(sum)
    setCurrentValue(0)
    addToHistory(buttonId)
  }

  const addToHistory = (buttonId) => {
    const currentDate = format(new Date(), `yyyy-MM-dd pp` );
    const updatedHistory = [...history, { buttonId, date: currentDate , currentValue }];
    setHistory(updatedHistory);
  };

  return (
    <>
      <div className='expenses'>
        <h2>Balance : {previousValue}</h2>
        <div className='input'>
          <input
            id='input'
            pattern='[0-9]*'
            type="text"
            value={currentValue}
            onChange={handleChange}
            className={error ? 'error' : ''}
          />
        </div>
        <div className='error'>
          {error && <p className="error-message">Invalid input. Please enter a number.</p>}
          </div>
        <div className='Button'>
          <button id='Add' onClick={(e)=>handleAdd(e.target.id)}>Add</button>
          <button id='Remove' onClick={(e)=>handleRemove(e.target.id)} >Remove</button>
        </div>
      </div>
      <div className='transactions'>
        <h2>Transactions:</h2>
        {history.length === 0 ? (
          <p>No history available.</p>
          ) : (
          <ul>
            {history.map((entry, index) => (
              <li key={index}>
                <span>{entry.date}</span>
                <span> - </span>
                <span>{entry.currentValue}</span>
                <span> - </span>
                <span>{entry.buttonId}</span>
              </li>
            ))}
          </ul>
          )}
      </div>
    </>
  );
};

export default Expenses;

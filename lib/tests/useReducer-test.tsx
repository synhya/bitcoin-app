'use client';


import { useReducer } from 'react'
type Action = {
  type: 'INCREMENT' | 'DECREMENT',
}
function reducer(state: number, action: Action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

function Counter() {
  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    dispatch({type: 'INCREMENT'});
    // setState(state - 1);
  }
  const onDecrease = () => {
    dispatch({type: 'DECREMENT'});
  }

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  )
}
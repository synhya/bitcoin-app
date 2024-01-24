'use client';
import React, { useEffect, useRef, useState } from 'react'

export const MyComponent = () => {
  const mounted = useRef(false);

  useEffect(() => {
    console.log('componentDidMount');

    return () => {
      console.log('componentWillUnmount')
    }
  }, [])

  useEffect(() => {
    if(!mounted.current) {
      mounted.current = true;
    } else {
      console.log('componentDidUpdate');
    }
  });
  //////////////////

  const [count, setCount] = useState(0);
  const ref = useRef(count);

  ref.current = count;

  useEffect(() => {
    return () => {
      console.log("count", ref.current);
    }
  }, [])

  return (
    <div>

    </div>
  )
};
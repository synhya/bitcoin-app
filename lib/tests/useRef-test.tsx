"use client";
import { useEffect, useRef, useState } from "react";

import React from "react";

const MyComponent = () => {
  const [count, setCount] = useState(1);
  // const [renderingCount ,setRenderingCount] = useState(1);
  const renderingCount = useRef(1);

  useEffect(() => {
    console.log("rendering count: ", renderingCount);
    // setRenderingCount(renderingCount + 1); // infinite loop
    ++renderingCount.current;
  });

  return <div></div>;
};

const InputFocusComp = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  function focus() {
    inputRef.current && inputRef.current.focus();
    console.log(inputRef.current);
  }

  return (
    <div>
      <input ref={inputRef} type="text" placeholder={"id here"} />
      <button onClick={focus}>focus</button>
    </div>
  );
};

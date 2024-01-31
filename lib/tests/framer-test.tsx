"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";

const FramerTest = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);

  return (
    <>
      <Counter from={1} to={10000} />
      <div className="border-pink-300 w-fit border-8 size-10">
        <motion.div
          className="w-10 h-10 bg-primary"
          animate={{ x, y, rotate }}
          transition={{ type: "spring" }}
        />
      </div>
      <div className="inputs">
        <Slider value={x} set={setX}>
          x
        </Slider>
        <Slider value={y} set={setY}>
          y
        </Slider>
        <Slider value={rotate} set={setRotate} min={-180} max={180}>
          rotate
        </Slider>
      </div>
    </>
  );
};

type CounterProps = { from: number; to: number };

const Counter = ({ from, to }: CounterProps) => {
  const nodeRef = useRef<React.ComponentRef<"p">>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, []);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = value.toFixed(2);
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return (
    <motion.p
      ref={nodeRef}
      initial={{ opacity: 0, scale: 0.1 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4 }}
    />
  );
};

interface InputProps {
  children: string;
  value: number;
  set: (newValue: number) => void;
  min?: number;
  max?: number;
}

const Slider = ({
  value,
  children,
  set,
  min = -200,
  max = 200,
}: InputProps) => {
  return (
    <label>
      <code>{children}</code>
      <input
        value={value}
        type="range"
        min={min}
        max={max}
        onChange={(e) => set(parseFloat(e.target.value))}
      />
    </label>
  );
};

export default FramerTest;

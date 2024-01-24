
//
import { forwardRef, useEffect, useRef } from 'react'

const SelectQuery = () => {
  const ballRef = useRef<HTMLDivElement>(null);

  const element = document.querySelector('slot');

  useEffect(() => {
    const { current } = ballRef;
    if(current !== null) {
      current.style.opacity = '0';
    }
  }, [])

  return (
    <>
      <div ref={ballRef}>

      </div>
    </>
  )
}
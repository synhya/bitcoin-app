'use client';
import React, { useEffect, useRef, useState } from 'react'

interface PlayerProps extends React.ComponentProps<'video'> {
  isPlaying: boolean,
}

const VideoPlayer = ({ src, isPlaying }:PlayerProps) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if(isPlaying) {
      ref.current?.play();
    } else {
      ref.current?.pause();
    }
  }, [isPlaying])

  return (
    <video src={src} ref={ref}/>
  )
}

export const TestPlayer = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return(
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  )
}
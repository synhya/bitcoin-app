'use client';
import React, { useEffect, useRef, useState } from 'react'
import Artplayer from 'artplayer'
import Option from 'artplayer/types/option'
import Hls from 'hls.js';

const option: Option = {
  container: '.artplayer-app',
  url: './assets/sample/video.mp4',
  volume: 0.5,
}

interface PlayerProps extends React.ComponentProps<'div'> {
  option: Option,
  getInstance?: (art: Artplayer) => void,
}

const VideoPlayer = ({option, ...rest}: PlayerProps) => {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const artRef = useRef<Artplayer | null>(null);
  const [savedTime, setSavedTime] = useState<number>(0);

  useEffect(() => {
    if (playerRef.current && !artRef.current) {
      artRef.current = new Artplayer({
        ...option,
        container: playerRef.current,
        customType: {
          m3u8: playM3u8,
        },
      })
    }

    return () => {
      artRef.current?.destroy();
    };
  }, [option]);

  function playM3u8(video: HTMLVideoElement, url: string, art: Artplayer) {
    if (Hls.isSupported()) {
      if (art.hls) art.hls.destroy();
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      art.hls = hls;
      art.on('destroy', () => hls.destroy());
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
    } else {
      art.notice.show = 'Unsupported playback format: m3u8';
    }
  }

  return (
    <div {...rest} ref={playerRef} />
  )
}

export default VideoPlayer

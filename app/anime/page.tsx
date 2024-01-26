'use client';
import React, { useState } from 'react'
import Example from "@/components/simple-line-chart";
import axios from 'axios'
import VideoPlayer from '@/components/video-player'


const Page = () => {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchAnimeInfo = async () => {
  //     try {
  //       const res = await animeApi.getInfo(id);
  //     } catch (error) {
  //       console.error('error fetching anime info', error);
  //     }
  //   }
  // }, [])

  return (
    <div className="flex flex-col justify-center items-center">
      <div className='w-full h-[200px]'>
        <Example />
      </div>
      <div>
        {selectedUrl && (
          <VideoPlayer
            option={{
              container: '',
              url:selectedUrl
            }}
            className={'w-400 h-300'}
          />
        )}
      </div>
    </div>
  );
};

export default Page;

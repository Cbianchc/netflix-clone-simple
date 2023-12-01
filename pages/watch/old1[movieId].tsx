import React, { useEffect, useRef } from 'react';
import useMovie from '@/hooks/useMovie';
import { useRouter } from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const { data } = useMovie(movieId as string);

  const vimeoPlayerRef = useRef(null);

  useEffect(() => {
    if (data?.videoUrl) {
      const options = {
        id: getVimeoVideoId(data.videoUrl),
        autopause: 0,
        autoplay: 1,
        background: 1,
        muted: 1,
      };

      //vimeoPlayerRef.current = new window.Vimeo.Player('vimeo-player', options);
    }
  }, [data]);

  const getVimeoVideoId = (url: string) => {
    const match = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
    return match && match[1];
  };

  return (
    <div className='h-screen w-screen bg-black'>
      <nav className='fixed w-full p-3 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-50'>
        <AiOutlineArrowLeft
          onClick={() => router.push('/')}
          className='text-white hover:text-opacity-60'
          size={30}
        />
        <p className='text-white text-lg md:text-xl font-bold'>
          <span className='font-light'>Estás mirando: </span>
          {data?.title}
        </p>
      </nav>
      <div id="vimeo-player" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default Watch;


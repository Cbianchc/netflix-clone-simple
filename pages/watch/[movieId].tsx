import React from 'react';

import useMovie from '@/hooks/useMovie';
import { useRouter } from 'next/router';

import { AiOutlineArrowLeft } from 'react-icons/ai';

const Watch = () => {
    const router = useRouter();
    const { movieId } = router.query;

    const { data } = useMovie(movieId as string);

    return(
        <div className='h-screen w.screen bg-black'>
            <nav className='
                fixed
                w-full
                p-3
                z-10
                flex
                flex-row
                items-center
                gap-8
                bg-black
                bg-opacity-50
            '>
                <AiOutlineArrowLeft 
                    onClick={() => router.push('/')}
                    className='text-white hover:text-opacity-60' size={30} />
                <p className='text-white text-lg md:text-xl font-bold'>
                    <span className='font-light'>
                        Estas mirando: 
                    </span>
                    {data?.title}
                </p>
            </nav>
            <video 
                src={data?.videoUrl}
                className='h-full w-full'
                autoPlay 
                controls>
            </video>
        </div>
    )
}
export default Watch;
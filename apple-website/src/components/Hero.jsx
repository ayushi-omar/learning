import React, { useEffect } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '../utils';

const Hero = () => {
    const [videoSrc, setVideoSrc] = React.useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo);

    const handleVideoSrcSet = () => {
        if (window.innerWidth < 760) { 
            setVideoSrc(smallHeroVideo);
        } else {
            setVideoSrc(heroVideo);
        }
    }
    useEffect(()=> {
        window.addEventListener('resize', handleVideoSrcSet);
        return () => {
            window.removeEventListener('resize', handleVideoSrcSet);
        }
    },[])

    useGSAP(() => {
        gsap.to('#hero', {
            opacity: 1,
            delay: 1.5
        })
        gsap.to('#cta', {
            opacity: 1,
            // translateY: 0,
            delay: 2,
            y: -50,
        })
    }, [])

    return (
        <section className='w-full nav-height bg-black relative'>
            <div className='h-5/6 w-full flex-center flex-col'>
                <p id='hero' className='hero-title'>iPhone 15 Pro</p>
                <div className='md:w-10/12 w-9/12'>
                    <video autoPlay muted playsInline key={videoSrc}
                        className='pointer-events-none'>
                        <source src={videoSrc} type='video/mp4' />
                    </video>
                </div>
            </div>
            {/* <h1 className='text-5xl font-bold'>Welcome to the Apple Store</h1> */}
            <div id='cta' className='flex flex-col items-center opacity-0 translate-y-20'>
                <a href='#' className='btn'>
                    Buy Now
                </a>
                <p className='font-normal text-xl'>From $999/month or $999</p>
            </div>
        </section>
    )
}

export default Hero
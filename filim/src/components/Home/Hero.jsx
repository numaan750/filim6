'use client';
import React from 'react';
import Image from 'next/image';
import share from '../../assets/images/share.png';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
const Hero = ({ title1, description, button, image, height, alt, link }) => {
  return (
    <div>
      <div className='bg-black text-white'>
        {/* Hero Section */}
        <div
          className={`relative  ${
            height ? 'h-[120vh] max-sm:h-[70vh]' : 'h-[100vh] max-sm:h-[60vh]'
          }`}
        >
          {/* <img
            src={image[0].value}
            alt='Hero Background'
            layout='fill'
            objectFit='cover'
            className='absolute inset-0 w-full'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-black/50 to-white/1' /> */}

          <Swiper className='w-full h-full'>
            <div>
              {image.map((img, index) => (
                <SwiperSlide key={index}>
                  {img.type === 'video' ? (
                    <video
                      className='absolute inset-0 w-full h-full object-cover'
                      src={img.value}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <Image
                      src={img.value}
                      width={100}
                      height={100}
                      alt={alt || 'Hero Background'}
                      layout='fill'
                      objectFit='cover'
                      className='absolute inset-0 w-full  h-full object-cover'
                    />
                  )}
                </SwiperSlide>
              ))}
              <div className='absolute inset-0 bg-gradient-to-r from-black/50 to-white/1' />
            </div>
          </Swiper>

          {/* Content */}
          <div className=' absolute top-0 z-10 px-4 sm:px-6 lg:px-20 h-full flex items-center'>
            {/* Animate text content from left */}
            <motion.div
              className='pt-28'
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <div>
                <h1 className=' max-w-[650px] lg:leading-[80px] md:leading-[70px] max-sm:leading-[38px] text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-3 sm:mb-10'>
                  {title1}
                </h1>
                <p className='text-lg sm:text-xl text-gray-300 mb-8'>
                  {description}
                </p>
                <a href={link} target='_blank'>
                  {button && (
                    <button
                      className='w-40 py-2 duration-300 transition-all text-white
           bg-gradient-to-r from-[#69CCF6] to-blue-600
           hover:bg-white hover:text-black 
           hover:from-transparent hover:to-transparent'
                    >
                      {button}
                    </button>
                  )}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        {/* <div className='relative'>
          <p
            onClick={() => window.open('https://wa.me/', '_blank')}
            className='text-5xl cursor-pointer'
          >
            <Image
              src={share}
              alt='share'
              className='absolute bottom-12 right-6 w-14 z-30'
            />
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;

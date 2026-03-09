'use client';

import Link from 'next/link';
import React from 'react';

const Button = ({button,link}) => {
  return (
    <div>
      <a href={link} target='_blank'>
        <button className=' w-40 py-1.5 duration-300 transition-all text-white bg-gradient-to-r from-[#69CCF6] to-blue-600   hover:scale-105'>
          {button}
        </button>
      </a>
    </div>
  );
};

export default Button;

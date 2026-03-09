'use client';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import axios from 'axios';
import logo from '../../assets/images/logo.png';
import { usePathname } from 'next/navigation';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(""); // New state for active navbar item

  const [navbarData, setNavbarData] = useState({});


  const linksStatic = [
    { name: 'Studio', link: '/studio' },
    { name: 'Services', link: '/services' },
    { name: 'Festival', link: '/festival' },
    { name: 'News', link: '/news' },
    { name: 'Contact', link: '/contact' },
  ];

  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/navbar`
        );
        if (data.navbar && data.navbar.length > 0) {
          const nav = data.navbar[0];
          setNavbarData(nav);
        }
      } catch (error) {
        console.error('Error fetching Navbar data', error);
      }
    };

    fetchNavbar();
  }, []);

 

  const tiktokSocialLink =
    navbarData?.links?.find((item) => item.name.toLowerCase() === 'tiktok')
      ?.link || 'https://tiktok.com';
  const youtubeSocialLink =
    navbarData?.links?.find((item) => item.name.toLowerCase() === 'youtube')
      ?.link || 'https://youtube.com';
  const instagramSocialLink =
    navbarData?.links?.find((item) => item.name.toLowerCase() === 'instagram')
      ?.link || 'https://instagram.com';
  const twitterSocialLink =
    navbarData?.links?.find((item) => item.name.toLowerCase() === 'twitter')
      ?.link || 'https://twitter.com';

  return (
    <div
      className={` sticky top-0 w-full z-50 text-white transition-all duration-300 `}
    >
      <div
        className={` bg-[#121212] bg-opacity-70 backdrop-blur-md absolute left-0 right-0 px-4 sm:px-6 lg:px-20 
   `}
      >
        <div className='flex items-center gap-3 max-md:justify-start justify-between pt-10 pb-10 h-16'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link
              href='/'
              onClick={() => {
                setActiveNav('/'); 
              
              }}
              className='flex items-center space-x-2 relative z-10'
            >
              <Image
                src={navbarData?.logo || logo}
                width={200}
                height={200}
                alt='Logo'
                className='object-contain lg:w-44 md:w-44 sm:w-44 w-32'
              />
            </Link>
          </div>

          <div className='max-[920px]:block hidden absolute right-4'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='relative z-50 text-white focus:outline-none'
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`font-sans font-normal min-[920px]:flex min-[920px]:items-center min-[920px]:gap-12 absolute -top-4 left-0 w-full bg-heading transition-all duration-500 ease-in-out transform ${
              isOpen
                ? 'translate-x-0 opacity-100 py-16'
                : '-translate-x-full opacity-0'
            } min-[920px]:opacity-100 min-[920px]:translate-x-0 min-[920px]:h-auto min-[920px]:block min-[920px]:static min-[920px]:w-auto min-[920px]:bg-transparent`}
          >
            <div className='flex flex-col min-[920px]:flex-row items-center space-y-4 min-[920px]:space-y-0 min-[920px]:space-x-8 p-4 min-[920px]:p-0'>
              <Link
                href='/'
                className={`hover:text-[#2ec3f5] pb-2 hover:border-b-2 border-[#2ec3f5] transition-colors text-[22px] ${
                  activeNav === '/' ? 'text-[#2ec3f5] border-b-2' : ''
                }`}
                onClick={() => {
                  setActiveNav('/');
                  setIsOpen(false);
                }}
              >
                <FaHome size={30} />
              </Link>
              {linksStatic.map((item, ind) => (
                <Link
                  key={ind}
                  href={item.link}
                  className={`hover:text-[#2ec3f5] pb-1 hover:border-b-2 border-[#2ec3f5] transition-colors text-[22px] ${
                    activeNav === item.link ? 'text-[#2ec3f5] border-b-2' : ''
                  }`}
                  onClick={() => {
                    setActiveNav(item.link);
                    setIsOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className='flex items-center max-[920px]:hidden max-[920px]:justify-center max-sm:mt-4 space-x-4'>
            {/* Social Icons for larger screens using dynamic links */}
            <Link href={twitterSocialLink} target='_blank' aria-label='Twitter'>
              <img
                src={navbarData?.twitterIcon || logo}
                alt='Twitter Icon'
                className=' object-contain h-6 w-6'
              />
            </Link>
            <Link
              href={instagramSocialLink}
              target='_blank'
              aria-label='Instagram'
            >
              <img
                src={navbarData?.instaIcon || logo}
                alt='Instagram Icon'
                className=' object-contain h-6 w-6'
              />
            </Link>
            <Link href={youtubeSocialLink} target='_blank' aria-label='YouTube'>
              <img
                src={navbarData?.youtubeIcon || logo}
                alt='YouTube Icon'
                className=' object-contain h-6 w-6'
              />
            </Link>
            <Link href={tiktokSocialLink} target='_blank' aria-label='TikTok'>
              <img
                src={navbarData?.tiktokIcon || logo}
                alt='TikTok Icon'
                className=' object-contain h-6 w-6'
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

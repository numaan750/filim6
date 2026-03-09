'use client';

import { useParams } from 'next/navigation';
// import { articles } from '@/components/News/StaticData';
import Image from 'next/image';
import Hero from '@/components/Home/Hero';
import hero from '../../../assets/images/dragon.png';
import { PiCopySimple } from 'react-icons/pi';
import { FaRegUserCircle } from 'react-icons/fa';
import { CiCalendar } from 'react-icons/ci';
import { BsChatText } from 'react-icons/bs';
import radious from '../../../assets/images/radious.png';
import youtube from '../../../assets/images/you3.png';
import linked from '../../../assets/images/linked.png';
import p from '../../../assets/images/p.png';
import whatsapp from '../../../assets/images/whatsapp.png';
import twitter from '../../../assets/images/x.jpg';
import tiktok from '../../../assets/images/tik.png';
import colon from '../../../assets/images/colon.png';
import alion from '../../../assets/images/alion.png';
import space from '../../../assets/images/space.png';
import gallery1 from '../../../assets/images/gallery1.png';
import gallery2 from '../../../assets/images/gallery2.png';
import gallery3 from '../../../assets/images/gallery3.png';
import gallery4 from '../../../assets/images/gallery4.png';
import gallery5 from '../../../assets/images/gallery5.png';
import gallery6 from '../../../assets/images/gallery6.png';
import gallery7 from '../../../assets/images/gallery7.png';
import gallery8 from '../../../assets/images/gallery8.png';
import insta from '../../../assets/images/newInsta.webp';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
const BlogDetail = () => {
  const [title, setTitle] = useState();
  const [image, setImage] = useState(null);
  const [alt, setAlt] = useState();
  const { id } = useParams();
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [singleBlog, setSingleBlog] = useState(null);

  const [metaData, setMetaData] = useState({
    page: 'news',
    title: '',
    description: '',
  });
  const [metaId, setMetaId] = useState(null);
  const fetchSingleBlog = () => {
    const singleBlog = article.find((blog) => blog._id === id);
    setSingleBlog(singleBlog);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news/getnews`
        );
        console.log(data.news[0], 'response get api');
        const homeData = data.news[0];
        if (homeData) {
          setTitle(homeData.title || '');
          setImage(homeData.bgImage || '');
          setAlt(homeData.alt || '');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data');
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/getblog`
        );
        console.log(data.blogs, 'api response for blogs');

        if (data.blogs && data.blogs.length > 0) {
          setArticle(data.blogs); // Set the entire array
        } else {
          console.error('Failed to fetch blogs:', data.message);
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    fetchSingleBlog();
  }, [id, article]);

  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getmetadata`
        );
        if (
          response.data &&
          response.data.data &&
          response.data.data.length > 0
        ) {
          const meta = response.data.data[0];
          console.log(meta, 'meta data');
          setMetaData({
            page: 'news',
            title: meta.news.title,
            description: meta.news.description,
          });
          setMetaId(meta._id);
        }
      } catch (error) {
        console.error('Error fetching meta data:', error);
      }
    };

    fetchMetaData();
  }, []);
  console.log(singleBlog, 'single page Blog');

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen bg-gray-50'>
        <div className='flex flex-col items-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500'></div>
          <p className='mt-4 text-xl font-semibold text-gray-600'>
            Loading blogs...
          </p>
        </div>
      </div>
    );
  }

  if (!article.length) {
    return <div>No blogs found.</div>;
  }

const icons = [
  { src: insta, link: 'https://www.instagram.com' },
  { src: tiktok, link: 'https://www.tiktok.com' },
  { src: youtube, link: 'https://www.youtube.com' },
  { src: twitter, link: 'https://www.twitter.com' },
];  
const gallerys = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
    gallery7,
    gallery8,
  ];
  const tags = [
    'Game',
    'iphone',
    'Tv',
    'Asus',
    'Laptops',
    'Macbook',
    'Speaker',
    'Microwave',
    'Samsung',
    'Tablet',
  ];

  return (
    <div className=' '>
      <Helmet>
        <title>{metaData?.title || 'Default Title'}</title>
        <meta name='description' content={metaData.description} />
      </Helmet>
      <Hero
        image={[{ type: 'video', value: image }]}
        title1={title || 'Frames Gen-3 '}
        alt={alt}
      />

      <div className='grid lg:grid-cols-[65%_33%] max-md:grid-cols-1 md:gap-8  px-4 sm:px-6 lg:px-20 mt-8 '>
        <div className=''>
          <h1 className=' text-3xl pb-6  font-sans'>{singleBlog?.title}</h1>
          <div className='mb-6'>
            <Image
              width={500}
              height={500}
              src={singleBlog?.image}
              alt={singleBlog?.title}
              className='w-full object-cover '
            />
          </div>
          <div className='flex flex-wrap items-center gap-4 justify-between '>
            <div className='flex items-center gap-4 justify-between flex-wrap'>
              <div className='flex items-center gap-2 '>
                {/* <Image src={radious} alt='image' /> */}
                <p className='text-black'>AUTHOR:</p>
                <p className='text-gray-600'>{singleBlog?.author}</p>
              </div>
              <div className='flex items-center gap-2'>
                <CiCalendar size={18} />
                <p className='text-sm text-[#475156] font-sans '>
                  {new Date(singleBlog?.createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className='flex items-center gap-3 '>
              {icons.map((icon, ind) => {
                return (
                  <div className='flex' key={ind}>
                    <a
                      href={icon.link}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Image
                        src={icon.src}
                        alt='image'
                        className={ind === 0 ? 'w-12' : 'w-8'}
                      />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          <div className='pb-12'>
            <div dangerouslySetInnerHTML={{ __html: singleBlog?.content }} />
          </div>
        </div>
        <div className='mb-12'>
          <div className='border border-[#E4E7E9] px-6 max-sm:px-3 max-sm:mt-6 rounded '>
            <h1 className='pt-6 pb-6 text-xl font-sans text-[#191C1F]'>
              Latest Blog
            </h1>
            {article.slice(0, 3).map((artical, ind) => {
              return (
                <Link href={`/news/${artical._id}`} key={artical._id || ind}>
                  <div
                    className=' hover:scale-105 transition-all duration-300 cursor-pointer flex max-sm:items-start items-center 2xl:gap-5 gap-2
                  font-sans mb-6 '
                  >
                    <div>
                      <Image
                        width={300}
                        height={300}
                        src={artical?.image || alion}
                        alt={artical.image}
                        className='max-w-40 max-h-28 rounded-sm'
                      />
                    </div>
                    <div>
                      <h2 className='text-sm text-[#191C1F] font-medium '>
                        {artical?.title}
                      </h2>
                      <p className='text-[#77878F] font-normal text-sm pt-1.5'>
                        {new Date(artical?.createdAt).toLocaleDateString(
                          'en-US',
                          {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          }
                        )}{' '}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* <div className='border border-[#E4E7E9] px-6 max-sm:px-3 max-sm:mt-6 rounded mt-6'>
            <h1 className='pt-6 pb-6 text-xl font-sans font-normal text-[#191C1F]'>
              GALLERY
            </h1>
            <div className='grid grid-cols-4 gap-3 mb-6'>
              {gallerys.map((images, ind) => {
                return (
                  <div key={ind} className=''>
                    <Image
                      src={images}
                      alt='image'
                      className='rounded-sm  w-full '
                    />
                  </div>
                );
              })}
            </div>
          </div> */}
          {/* tags */}
          {/* <div className='font-sans '>
            <h1 className='pt-6 pb-6 text-xl font-sans font-normal text-[#191C1F]'>
              Popular Tag
            </h1>
            <div className='flex flex-wrap gap-3 mb-6'>
              {tags.map((tags, ind) => {
                return (
                  <div
                    key={ind}
                    className=' cursor-pointer border border-[#E4E7E9] px-3 py-1
                   hover:text-[#3B5998] hover:bg-[#1DA1F2]/20'
                  >
                    <p className='font-medium '>{tags}</p>
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

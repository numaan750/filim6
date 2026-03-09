'use client';

import Image from 'next/image';
import comment from '../../assets/images/comment.svg';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import item from '../../assets/images/item-blog.png';

const Blogs = () => {
  const [bloges, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/getblog`
        );
        console.log(data.blogs, 'api response for blogs');

        if (data.blogs && data.blogs.length > 0) {
          setBlogs(data.blogs); // Set the entire array
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

  if (loading) {
    return <div>Loading blogs...</div>;
  }

  if (!bloges.length) {
    return <div>No blogs found.</div>;
  }

  return (
    <div className='relative'>
      <div className='bg-[#F8F8F8] text-center md:h-[300px] sm:h-[230px] h-[170px] sm:pt-20 pt-8'>
        <h1 className='text-2xl md:text-5xl max-w-xl m-auto text-[#2B3674] mb-2 px-4'>
          Latest News & Articles From The Post
        </h1>
      </div>
      <div className='sm:-mt-32 -mt-28'>
        <div className='max-w-7xl m-auto px-4 sm:px-6 lg:px-20 pt-16'>
          <div className='relative  z-10 mb-24 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8'>
            {bloges.slice(0, 3).map((article, ind) => (
              <motion.div
                key={article._id || ind}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <Link
                  href={`/news/${article._id}`}
                  className='group cursor-pointer '
                >
                  <div className='relative z-50 mb-6'>
                    <Image
                      width={500}
                      height={500}
                      src={article.image}
                      alt={article.title || 'blog'}
                      className='w-full max-h-56 object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                    <div className='absolute -bottom-4 z-50 right-6 bg-[#2D4A68] backdrop-blur-sm px-3 py-1 flex items-center gap-1'>
                      <span className='text-sm text-white'>
                        {new Date(article.createdAt).toLocaleDateString(
                          'en-US',
                          {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          }
                        )}
                      </span>
                    </div>
                  </div>
                  <div className='shadow-xl px-5'>
                    <div className='flex items-center mb-3'>
                      {/* <Image
                        src={item}
                        alt='avatar'
                        width={40}
                        height={40}
                        className='rounded-full w-10 h-10 object-cover'
                      /> */}
                      <div className='flex items-center gap-2'>
                        <span className='text-sm text-[#2B3674]'>
                          by {article.author}
                        </span>
                        {/* <span className='text-sm text-[#2B3674]'>|</span> */}
                        {/* <span className='flex items-center gap-2 text-sm text-[#2B3674]'>
                          <Image
                            src={comment}
                            alt='comment'
                            width={20}
                            height={20}
                          />
                          <p>Comment</p>
                        </span> */}
                      </div>
                    </div>
                    <h3 className='lg:text-2xl md:text-xl text-2xl font-bold text-black mb-3'>
                      {article.title}
                    </h3>
                    <button className='mb-8 mt-2 text-[#737373] hover:text-buttonColor transition-colors'>
                      Read More
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;

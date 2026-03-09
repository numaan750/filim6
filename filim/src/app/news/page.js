'use client'
import Hero from '@/components/Home/Hero';
import React, { useEffect, useState } from 'react'
import hero from '../../assets/images/dragon.png';
import BlogsNews from '@/components/News/BlogsNews';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const page = () => {
  const [title, setTitle] = useState();
  const [image, setImage] = useState(null);
  const [alt , setAlt] = useState();
  const [metaData, setMetaData] = useState({
    page: 'news',
    title: '',
    description: '',
  });
  const [metaId, setMetaId] = useState(null);


  // Fetch existing news data
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
  return (
    <div>
      <Helmet>
        <title>{metaData?.title}</title>
        <meta content={metaData.description} />
      </Helmet>
      <Hero
        image={[{ type: 'video', value: image }]}
        title1={title}
        alt={alt}
      />
      <BlogsNews />
      {/* AlphaAct-One */}
    </div>
  );
}

export default page
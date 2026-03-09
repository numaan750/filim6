'use client'
import Hero from '@/components/Home/Hero';
import TopListing from '@/components/Home/TopListing';
import React, { useEffect, useState } from 'react'
import hero from '../../assets/images/studio.png';
import studio1 from '../../assets/images/studio1.png';
import studio2 from '../../assets/images/studio2.png';
import studio3 from '../../assets/images/studio3.png';
import studio4 from '../../assets/images/studio4.png';
import Advancing from '@/components/Home/Advancing';
import axios from 'axios';
import Head from 'next/head';
import { Helmet } from 'react-helmet';


const page = () => {
  
  const [heroData, setHeroData] = useState({});
  const [advanceData, setAdvanceData] = useState({});
  const [toplist, setToplist] = useState({});
  const [robot, setRobot] = useState({});
  const [competate, setCompetate] = useState({});
  const [runway, setRunway] = useState({});


const [metaData, setMetaData] = useState({
    page: 'studio',
    title: '',
    description: '',
  });
  const [metaId, setMetaId] = useState(null);

  
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/studio/getstudio`
        );
        setHeroData(data.studio[0].hero);
        setAdvanceData(data.studio[0].advance);
        setToplist(data.studio[0].toplist);
        setRobot(data.studio[0].competate);
        setCompetate(data.studio[0].toplist2);
        setRunway(data.studio[0].competate2);

        console.log(data, 'studio data');
      } catch (error) {
        console.error('Error fetching studio data:', error);
      }
    };

    fetchHeroData();
  }, []);



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
          page: 'studio',
          title: meta.studio.title,
          description: meta.studio.description,
        });
        setMetaId(meta._id);
      }
    } catch (error) {
      console.error('Error fetching meta data:', error);
    }
  };
  useEffect(() => {

    fetchMetaData();
  }, [metaData]);

  return (
    <div>
      <Helmet>
        <title>{metaData?.title}</title>
        <meta content={metaData.description} />
      </Helmet>
      <Hero
        image={[{ type: 'video', value: heroData?.bgImage }]}
        title1={heroData.title}
        alt={heroData.alt}
      />
      <Advancing
        title1={advanceData?.title}
        title2={advanceData?.title2}
        description={advanceData?.description}
      />
      <TopListing
        title={toplist?.title}
        description={toplist?.description}
        image={toplist?.bgImage}
        button={toplist?.button}
        genere={toplist?.genre}
        line={toplist?.line}
        description2={toplist?.description2}
        height='height'
        bgColor='color'
        alt={toplist?.alt}
        link={toplist?.link}
      />
      <div className='md:mt-32'>
        <TopListing
          title={robot?.title}
          description={robot?.description}
          image={robot?.bgImage}
          button={robot?.button}
          genere={robot?.genre}
          description2={robot?.description2}
          order='reverse'
          height='height'
          bgColor='color'
          alt={robot?.alt}
          link={robot?.link}
        />
      </div>
      <div className='md:mt-32'>
        <TopListing
          title={competate?.title}
          description={competate?.description}
          image={competate?.bgImage}
          button={competate?.button}
          genere={competate?.genre}
          line={competate?.line}
          description2={competate?.description2}
          height='height'
          bgColor='color'
          alt={competate?.alt}
          link={competate?.link}
        />
      </div>
      <div className='md:mt-32 md:mb-40 max-sm:mb-16'>
        <TopListing
          title={runway?.title}
          description={runway?.description}
          image={runway?.bgImage}
          button={runway?.button}
          genere={runway?.genre}
          description2={runway?.description2}
          order='reverse'
          height='height'
          bgColor='color'
          alt={runway?.alt}
          link={runway?.link}
        />
      </div>
    </div>
  );
}

export default page
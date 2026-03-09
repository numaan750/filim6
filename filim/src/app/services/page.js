'use client'
import Hero from '@/components/Home/Hero'
import React, { useEffect, useState } from 'react'
import hero from '../../assets/images/galexy.png';
import lione from '../../assets/images/protection.png';
import TopListing from '@/components/Home/TopListing';
import Advancing from '@/components/Home/Advancing';
import img from '../../assets/images/artical.png';
import competition from '../../assets/images/reviews.png';
import Robot from '@/components/Home/Robot';
import Runway from '@/components/Home/Runway';
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

  // State for the home meta data.
  const [metaData, setMetaData] = useState({
    page: 'services',
    title: '',
    description: '',
  });
  const [metaId, setMetaId] = useState(null);

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
           page: 'services',
           title: meta.services.title,
           description: meta.services.description,
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

  // META API CALL

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service/getservice`
        );
        setHeroData(data.services[0].hero);
        setAdvanceData(data.services[0].advance);
        setToplist(data.services[0].toplist);
        setRobot(data.services[0].robot);
        setCompetate(data.services[0].competate);
        setRunway(data.services[0].runway);

        console.log(data.services[0].hero, 'service data');
      } catch (error) {
        console.error('Error fetching service data:', error);
      }
    };

    fetchHeroData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>{metaData?.title}</title>
        <meta content={metaData.description} />
      </Helmet>
      <Hero
        image={[{ type: 'video', value: heroData?.bgImage }]}
        title1={heroData?.title}
        alt={heroData?.alt}
      />

      <div className='max-md:pt-16'>
        <Advancing
          title1={advanceData?.title}
          title2={advanceData?.title2}
          description={advanceData?.description}
          image={advanceData?.bgImage}
          color='bg-[#F8F8F8]'
          alt={advanceData?.alt}
        />
      </div>
      <TopListing
        title={toplist?.title}
        description={toplist?.description}
        image={toplist?.bgImage}
        button={toplist?.button}
        alt={toplist?.alt}
        link={toplist?.link}
      />
      <Robot
        title={robot?.title}
        description={robot?.description}
        image={robot.bgImage}
        button={robot?.button}
        alt={robot?.alt}
        link={robot?.link}
      />
      <div>
        <TopListing
          alt={toplist?.alt}
          title={competate?.title}
          description={competate?.description}
          image={competate?.bgImage}
          button={competate?.button}
          order='reverse'
          link={competate?.link}
        />
        <div className='bg-[#F8F8F8] max-md:mt-12 md:h-48 md:-mt-16 relative -z-50'></div>
      </div>
      <Runway
        title={runway?.title}
        image={runway?.bgImage}
        button={runway?.button}
        alt={runway?.alt}
        link={runway?.link}
      />
    </div>
  );
}

export default page
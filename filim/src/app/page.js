'use client';
import { useEffect, useState } from 'react';
import Advancing from '@/components/Home/Advancing';
import Navbar from '@/components/Home/Hero';
import Robot from '@/components/Home/Robot';
import TopListing from '@/components/Home/TopListing';
import lione from '../assets/images/lione.png';
import Runway from '@/components/Home/Runway';
import competition from '../assets/images/competition.png';
import Blogs from '@/components/Home/Blogs';
import Hero from '@/components/Home/Hero';
import img from '../assets/images/hero3.png';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
// import video from '../assets/images/video.gif'
// import video1 from '../assets/images/video1.mp4';
// import video2 from '../assets/images/video.gif';
// import video3 from '../assets/images/video.gif';

export default function Home() {
  const [heroData, setHeroData] = useState({});
  const [advanceData, setAdvanceData] = useState({});
  const [toplist, setToplist] = useState({})
  const [robot, setRobot] = useState({})
  const [competate, setCompetate] = useState({})
  const [runway, setRunway] = useState({})
  const [metaData, setMetaData] = useState({
    page: 'home',
    title: '',
    description: '',
  });
  const [metaId, setMetaId] = useState(null);


  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home/gethome`
        );
        console.log(data.home[0].hero,'hero');
        
        setHeroData(data.home[0].hero);
        setAdvanceData(data.home[0].advance);
        setToplist(data.home[0].toplist);
        setRobot(data.home[0].robot);
        setCompetate(data.home[0].competate);
        setRunway(data.home[0].runway);

        console.log(data.home[0].hero, 'data hero');
      } catch (error) {
        console.error('Error fetching hero data:', error);
      }
    };
 
    fetchHeroData();
  }, []);

  console.log(heroData.link,'hero data log ha guys');
  


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
            page: 'home',
            title: meta.home.title,
            description: meta.home.description,
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
        <meta  content={metaData?.description} />
      </Helmet>

      <Hero
        height='height'
        image={[{ type: 'video', value: heroData?.bgImage }]}
        title1={heroData?.title}
        description={heroData?.description}
        button={heroData?.button}
        alt={heroData.alt}
        link={heroData.link}
      />
      <Advancing
        title1={advanceData?.title}
        title2={advanceData?.title2}
        description={advanceData?.description}
        image={advanceData?.bgImage}
        color='bg-[#F8F8F8]'
        alt={advanceData?.alt}
      />
      <TopListing
        title={toplist?.title}
        description={toplist?.description}
        image={toplist.bgImage}
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
      <TopListing
        title={competate?.title}
        description={competate?.description}
        image={competate?.bgImage}
        button={competate?.button}
        order='reverse'
        alt={competate?.alt}
        link={competate?.link}
      />
      <Runway
        title={runway?.title}
        image={runway?.bgImage}
        button={runway?.button}
        margin='mt-0'
        alt={runway?.alt}
        link={runway?.link}
      />

      <Blogs />
    </div>
  );
}

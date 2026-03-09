'use client'
import Hero from '@/components/Home/Hero';
import React, { useEffect, useState } from 'react';
import hero from '../../assets/images/contact.png';
import Advancing from '@/components/Home/Advancing';
import Form from '@/components/Contact/Form';
import ContactParah from '@/components/Home/ContactParah';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const page = () => {
  const [heroData, setHeroData] = useState({});
  const [advanceData, setAdvanceData] = useState({});

  
    const [metaData, setMetaData] = useState({
      page: 'contact',
      title: '',
      description: '',
    });
    const [metaId, setMetaId] = useState(null);
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact/getcontact`
        );
        console.log(data, 'contact data');
        
        setHeroData(data.contact[0].hero);
        setAdvanceData(data.contact[0].advance);
        

        console.log(data, 'contact data');
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };

    fetchHeroData();
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
            page: 'contact',
            title: meta.contact.title,
            description: meta.contact.description,
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
        image={[{ type: 'video', value: heroData?.bgImage }]}
        title1={ heroData?.title || 'Contact Us'}
        alt={heroData?.alt}
      />
      <Advancing title1={ advanceData?.title || 'have a question?'} />
      <ContactParah description={advanceData?.description} />
      <Form />
    </div>
  );
};

export default page;

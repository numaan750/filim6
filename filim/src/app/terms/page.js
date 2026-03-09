'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Terms from '@/components/faq/Terms';

const TermsPage = () => {

    const [metaData, setMetaData] = useState({
      page: 'terms',
      title: '',
      description: '',
    });
    const [metaId, setMetaId] = useState(null);

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
              page: 'terms',
              title: meta.terms.title,
              description: meta.terms.description,
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
              <Terms/>
    
        </div>
  );
};

export default TermsPage;

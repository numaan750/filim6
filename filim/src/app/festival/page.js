"use client";
import Head from "next/head";
import Hero from "@/components/Home/Hero";
import React, { useEffect, useState } from "react";
import hero from "../../assets/images/festival.png";
import img from "../../assets/images/festival2.png";
import lione from "../../assets/images/lione.png";
import Advancing from "@/components/Home/Advancing";
import TopListing from "@/components/Home/TopListing";
import Robot from "@/components/Home/Robot";
import competition from "../../assets/images/competition.png";
import Runway from "@/components/Home/Runway";
import axios from "axios";

const page = () => {
  const [heroData, setHeroData] = useState({});
  const [advanceData, setAdvanceData] = useState({});
  const [toplist, setToplist] = useState({});
  const [robot, setRobot] = useState({});
  const [competate, setCompetate] = useState({});
  const [runway, setRunway] = useState({});

  const [metaData, setMetaData] = useState({
    page: "festival",
    title: "",
    description: "",
  });
  const [metaId, setMetaId] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/festival/getfestival`,
        );
        setHeroData(data.festival[0].hero);
        setAdvanceData(data.festival[0].advance);
        setToplist(data.festival[0].toplist);
        setRobot(data.festival[0].robot);
        setCompetate(data.festival[0].competate);
        setRunway(data.festival[0].runway);

        console.log(data, "festival data");
      } catch (error) {
        console.error("Error fetching festival data:", error);
      }
    };

    fetchHeroData();
  }, []);

  // METADATA
  const fetchMetaData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getmetadata`,
      );
      if (
        response.data &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        const meta = response.data.data[0];
        setMetaData({
          page: "festival",
          title: meta.festival.title,
          description: meta.festival.description,
        });
        setMetaId(meta._id);
      }
    } catch (error) {
      console.error("Error fetching meta data:", error);
    }
  };
  useEffect(() => {
    fetchMetaData();
  }, []);
  return (
    <div>
      <Head>
        <title>{metaData?.title}</title>
        <meta name="description" content={metaData?.description} />
      </Head>
      <Hero
        image={[{ type: "video", value: heroData?.bgImage }]}
        title1={heroData?.title}
        alt={heroData?.alt}
      />{" "}
      <Advancing
        title1={advanceData?.title}
        title2={advanceData?.title2}
        description={advanceData?.description}
        image={advanceData?.bgImage}
        color="bg-[#F8F8F8]"
        alt={advanceData?.alt}
      />
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
          title={competate?.title}
          description={competate?.description}
          image={competate?.bgImage}
          button={competate?.button}
          order="reverse"
          alt={competate?.alt}
          link={competate?.link}
        />
        <div className="bg-[#F8F8F8] max-md:mt-12 md:h-48 md:-mt-16 relative -z-50"></div>
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
};

export default page;

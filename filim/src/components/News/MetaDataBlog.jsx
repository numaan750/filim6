import Head from 'next/head';

const MetaDataBlog = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='UTF-8' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
    </Head>
  );
};

export default MetaDataBlog;

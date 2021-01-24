import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Hero from '../components/Hero';
import DataTable from '../components/DataTable';
import content from '../content/data.md';

const {
  attributes: { title, description, datasets },
} = content;

const Page = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {title}</title>
    </Head>
    <Layout fullWidth flexColumn>
      <Hero title={title} description={description} />
      <Primary>
        <DataTable datasets={datasets} />
      </Primary>
    </Layout>
  </React.Fragment>
);
export default Page;

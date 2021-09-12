import React from 'react';
import App from 'next/app';
import { DefaultSeo } from 'next-seo';
import Page from '../components/Page';

// https://nextjs.org/docs/#custom-app

class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Page>
        <DefaultSeo
          titleTemplate="Texas Justice Initiative | %s"
          defaultTitle="Oversight for criminal justice data throughout Texas"
          description="Nonprofit organization that collects, analyzes, publishes and provides oversight for criminal justice data throughout Texas."
          openGraph={{
            type: 'website',
            locale: 'en_IE',
            url: 'https://texasjusticeinitiative.org',
            // Todo: Add logo as base image
            images: [
              {
                url: 'https://www.example.ie/og-image.jpg',
                width: 800,
                height: 600,
                alt: 'Texas Justice Initiative',
              },
            ],
          }}
          twitter={{
            handle: '@JusticeTexas',
            site: '@JusticeTexas',
            cardType: 'summary_large_image',
          }}
        />
        <Component {...pageProps} />
      </Page>
    );
  }
}

export default CustomApp;

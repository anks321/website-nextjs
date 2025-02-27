/* eslint-disable react/jsx-no-bind */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import HomepageNewsFeed from '../components/homepage/HomepageNewsFeed';
import StateofData from '../components/homepage/StateofData';
import datasets from '../data/datasets';
import BarChart from '../components/charts/chartsjs/BarChart';
import ChartNote from '../components/charts/chartsjs/ChartNote';
import theme from '../theme';

const title = 'Home Page';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      activeDataset: '',
      data: {},
      name: '',
    };
  }

  /**
   * Once component has mounted, fetch our initial dataset.
   */
  componentDidMount() {
    const { data, datasetNames } = this.props;
    // In order to setup our filters object, we need to get each key, along with all unique records for that key.
    // We can then create our filter object with all filters turned off by default

    this.setState({
      isLoading: false,
      activeDataset: datasetNames[0],
      data: {
        [datasetNames[0]]: data,
      },
      name: datasets[datasetNames[0]].name,
    });
  }

  /**
   * Check if we have already loaded the json for the selected dataset and fetch if we haven't.
   * @param {string} selectedDataset the slug of the new dataset to fetch. Should be an id with no spaces, rather than the title.
   */
  async fetchData(selectedDataset) {
    const { data, activeDataset } = this.state;

    // Do nothing if the selected dataset is already active.
    if (activeDataset === selectedDataset) {
      return;
    }

    // Have we already fetched this json? If not let's get it, add it to state, and update the active dataset
    // If we don't need to fetch the json again, just update the active dataset
    let newData;
    if (!data[selectedDataset]) {
      const res = await fetch(datasets[selectedDataset].urls.compressed);
      newData = await res.json();
    } else {
      newData = data[selectedDataset];
    }

    // Update our state
    this.setState({
      activeDataset: selectedDataset,
      data: {
        ...data,
        [selectedDataset]: newData,
      },
      name: datasets[selectedDataset].name,
    });
  }

  render() {
    // Destructure our state into something more readable
    const { isLoading, activeDataset, name, data } = this.state;
    const DatasetNames = Object.keys(datasets);

    /**
     * Check if we are still loading data from JSON and setup our HTML accordingly.
     * If loading is complete, display the chart, otherwise display a loading message.
     */
    if (isLoading === false) {
      // Setup our lookups
      const chartConfigs = datasets[activeDataset].chart_configs;
      const recordKeys = Object.keys(data[activeDataset].records);
      const totalIncidents = data[activeDataset].records[recordKeys[0]].length;
      const allUniqueRecords = [...new Set(data[activeDataset].records[recordKeys[0]])];

      let h1;
      switch (activeDataset) {
        case 'custodial-deaths':
          h1 = (
            <h1>
              Since 2005, <span className="text--red">{totalIncidents.toLocaleString()}</span> people have died in the
              custody of Texas law enforcement, based on state-mandated reports.
            </h1>
          );
          break;
        case 'civilians-shot':
          h1 = (
            <h1>
              Since Sept. 2015, Texas peace officers have shot{' '}
              <span className="text--red">{totalIncidents.toLocaleString()}</span> people, based on state-mandated
              reports.
            </h1>
          );
          break;
        case 'officers-shot':
          h1 = (
            <h1>
              Since Sept. 2015, <span className="text--red">{totalIncidents.toLocaleString()}</span> Texas peace
              officers have been shot, based on state-mandated reports.
            </h1>
          );
          break;
        default:
          h1 = (
            <h1>
              Since 2005, <span className="text--red">{totalIncidents.toLocaleString()}</span> people have died in the
              custody of Texas law enforcement, based on state-mandated reports.
            </h1>
          );
          break;
      }

      return (
        <React.Fragment>
          <NextSeo
            title={title}
            description="Texas Justice Initiative is a nonprofit organization that collects, analyzes, publishes and provides oversight for criminal justice data throughout Texas."
            openGraph={{
              description:
                'Texas Justice Initiative is a nonprofit organization that collects, analyzes, publishes and provides oversight for criminal justice data throughout Texas.',
            }}
          />
          <Layout>
            <Primary>
              <FlexWrap>
                <div className="mission-statement">
                  Texas Justice Initiative is a nonprofit organization that collects, analyzes, publishes and provides
                  oversight for criminal justice data throughout Texas.
                </div>
                <Banner>
                  <div className="banner-wrapper">
                    <div className="banner-left">
                      <div className="chartContainer bar-chart bar-chart--container">
                        <h3 className="bar-chart__title">{name}</h3>
                        <BarChart
                          title=""
                          recordKeys={allUniqueRecords}
                          records={data[activeDataset].records.year}
                          theme={theme}
                          incompleteYears={chartConfigs[0].incompleteYears}
                        />
                        {chartConfigs[0].note && <ChartNote note={chartConfigs[0].note} />}
                      </div>
                    </div>
                    <div className="banner-right">
                      {DatasetNames.map(datasetName => (
                        <ChangeChartButton
                          key={datasetName}
                          onClick={this.fetchData.bind(this, datasetName)}
                          className={
                            datasetName === activeDataset
                              ? 'btn btn--primary btn--chart-toggle active'
                              : 'btn btn--primary btn--chart-toggle'
                          }
                        >
                          <span className="btn--chart-toggle--text">{datasets[datasetName].name}</span>
                        </ChangeChartButton>
                      ))}
                    </div>
                    <br />
                    <div className="banner-heading">{h1}</div>
                    <div className="banner-callout">
                      <span className="banner-callout__text">Want to learn more?</span>
                      <a href="/data" className="btn btn--primary">
                        Explore the Data
                      </a>
                    </div>
                  </div>
                </Banner>
                <div className="divider--large divider--blue" />
                <HomepageNewsFeed />
                <StateofData />
              </FlexWrap>
            </Primary>
          </Layout>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <NextSeo title={title} />
        <Layout>
          <Primary>
            <FlexWrap>
              <div className="mission-statement">
                Texas Justice Initiative is a nonprofit organization that collects, analyzes, publishes oversight for
                criminal justice data throughout Texas.
              </div>
              <Banner>
                <div className="banner-wrapper">
                  <div className="banner-left">
                    <div className="bar-chart bar-chart--container">
                      <div className="chartContainer chart-loading">Loading...</div>
                    </div>
                  </div>
                  <div className="banner-right">
                    {DatasetNames.map(datasetName => (
                      <ChangeChartButton
                        key={datasetName}
                        onClick={this.fetchData.bind(this, datasetName)}
                        className={
                          datasetName === activeDataset
                            ? 'btn btn--primary btn--chart-toggle active'
                            : 'btn btn--primary btn--chart-toggle'
                        }
                      >
                        <span className="btn--chart-toggle--text">{datasets[datasetName].name}</span>
                      </ChangeChartButton>
                    ))}
                  </div>
                </div>
                <div className="banner-callout">
                  <span className="banner-callout__text">Want to learn more?</span>
                  <a href="/data" className="btn btn--primary">
                    Explore the Data
                  </a>
                </div>
              </Banner>
              <div className="divider--large divider--blue" />
              <HomepageNewsFeed />
              <StateofData />
            </FlexWrap>
          </Primary>
        </Layout>
      </React.Fragment>
    );
  }
}

export default Index;

Index.getInitialProps = async function() {
  // Setup an array to get the property name of each dataset
  const datasetNames = Object.keys(datasets);
  // Fetch the json for the first dataset
  const res = await fetch(datasets[datasetNames[0]].urls.compressed);
  const data = await res.json();
  return { datasetNames, data };
};

Index.propTypes = {
  datasetNames: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
};

const FlexWrap = styled.div`
  display: flex;
  flex-flow: row wrap;

  .mission-statement {
    color: #000000;
    font-size: 2.8rem;
    letter-spacing: 2px;
    line-height: 4.5rem;
    max-width: 860px;
    margin: 0 auto;
    padding: 3rem;
    text-align: center;
  }
`;

const Banner = styled.div`
  order: 0;
  width: 100%;

  @media screen and (min-width: ${props => props.theme.breakpoints.medium}) {
    padding: 2rem 0;
  }

  .banner-heading {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;

    @media screen and (min-width: ${props => props.theme.breakpoints.medium}) {
      padding: 2rem 0 0;
    }

    h1 {
      text-align: center;
      font-weight: 400;
      border-bottom-width: 0;

      @media screen and (max-width: ${props => props.theme.breakpoints.medium}) {
        font-size: 2.25rem;
      }
    }
  }

  .banner-wrapper {
    display: flex;
    flex-flow: row wrap;
    justify-content: stretch;
    width: 100%;
    padding: 2rem 0;

    @media screen and (min-width: ${props => props.theme.breakpoints.medium}) {
      background: ${props => props.theme.colors.grayLightest};
      padding: 3rem;
      align-items: stretch;
    }
  }

  .banner-left {
    width: 100%;
    margin-bottom: 4rem;

    @media screen and (min-width: ${props => props.theme.breakpoints.medium}) {
      width: 75%;
      padding-right: 2rem;
      margin-bottom: 0;
    }

    .bar-chart--container {
      width: 100%;
      height: 100%;
      background: ${props => props.theme.colors.grayLightest};
      box-shadow: 1px 1px 3px rgba(64, 64, 64, 0.5);
      padding: 0;
      padding-bottom: 1rem;

      .chart__plot {
        height: 400px;
      }

      @media screen and (min-width: ${props => props.theme.breakpoints.medium}) {
        background: ${props => props.theme.colors.white};
        padding: 1rem;
      }

      .bar-chart__title {
        text-align: center;
      }
    }
  }

  .banner-right {
    width: 100%;
    font-size: ${props => props.theme.typography.sizes.body.small};

    h3 {
      margin-top: 0;
    }

    .btn {
      width: 100%;
      max-width: 400px;
      padding: 1.5rem 1.5rem;
    }

    @media screen and (min-width: ${props => props.theme.breakpoints.medium}) {
      display: flex;
      flex-flow: column;
      width: 25%;
      padding-left: 1rem;

      .btn {
        width: auto;
      }
    }
  }

  .banner-callout {
    width: 100%;
    text-align: center;
    padding-top: 1rem;
    padding-bottom: 1rem;

    @media screen and (min-width: ${props => props.theme.breakpoints.medium}) {
      padding-bottom: 0;
    }
  }

  .banner-callout__text {
    display: block;
    font-style: italic;
    margin-bottom: 1rem;
  }
`;

const ChangeChartButton = styled.button`
  display: flex !important;
  align-items: center;
  text-align: left !important;
  text-transform: capitalize !important;
  letter-spacing: 1px !important;
  margin: 1rem 0;

  &.active {
    outline: none; /* Don't display border on chrome */
    box-shadow: none;
    background-color: ${props => props.theme.colors.secondaryBlue};
  }

  .btn--chart-toggle--text {
    font-size: ${props => props.theme.typography.sizes.body.small};
  }
`;

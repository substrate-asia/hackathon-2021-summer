import React, { Fragment, useState, useEffect } from 'react';
import Head from 'next/head';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import { theme } from 'common/theme/appModern';
import { ResetCSS } from 'common/assets/css/style';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import _ from 'lodash';

import GlobalStyle, {
  AppWrapper,
  ContentWrapper,
} from 'containers/AppModern/appModern.style';
import Navbar from 'containers/AppModern/Navbar';
import MatchingSection from 'containers/Agency/MatchingSection';
import Footer from 'containers/AppModern/Footer';
import ProjectDetailSection from 'containers/Agency/ProjectDetailSection';
import CommentsSection from 'containers/Agency/CommentsSection';
import PolkadotProvider from 'common/contexts/PolkadotContext';
import backend from '../../common/backend';

const Detail = () => {
  const router = useRouter();
  const { pid, rid } = router.query;

  const [voteRecords, setVoteRecords] = useState([]);

  const getVoteRecords = async () => {
    const result = await backend
      .getDatabase()
      .collection('votes')
      .where({
        projectIndex: parseInt(pid),
        roundIndex: parseInt(rid),
      })
      .get();

    setVoteRecords(result.data);
  };

  useEffect(getVoteRecords, []);

  const onVoted = () => {
    getVoteRecords();
  };

  if (_.isEmpty(pid) || _.isEmpty(rid)) {
    return <ErrorPage statusCode="404"></ErrorPage>;
  }

  return (
    <ThemeProvider theme={theme}>
      <PolkadotProvider projectId={pid} roundId={rid}>
        <Fragment>
          {/* Start agency head section */}
          <Head>
            <title>Quadratic Funding Program</title>
            <meta name="theme-color" content="#2563FF" />
            <meta name="Description" content="Quadratic Funding Program" />
            {/* Load google fonts */}
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i"
              rel="stylesheet"
            />
          </Head>
          <ResetCSS />
          <GlobalStyle />
          {/* End of agency head section */}
          {/* Start agency wrapper section */}
          <AppWrapper>
            <Sticky top={0} innerZ={9999} activeClass="sticky-active">
              <Navbar />
            </Sticky>
            <ContentWrapper>
              <MatchingSection rid={rid} onVote={onVoted} />
              <ProjectDetailSection rid={rid} />
              <CommentsSection
                projectIndex={pid}
                roundIndex={rid}
                voteRecords={voteRecords}
              />
            </ContentWrapper>
            <Footer />
          </AppWrapper>
          {/* End of agency wrapper section */}
        </Fragment>
      </PolkadotProvider>
    </ThemeProvider>
  );
};
export default Detail;

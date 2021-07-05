import React from 'react';
import Link from 'next/link';
import Fade from 'react-reveal/Fade';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import SectionWrapper, {
  ContentWrapper,
  NewsWrapper,
  NewsItem,
} from './news.style';

import { newsData } from 'common/data/Interior';

const News = () => {
  return (
    <SectionWrapper id="news">
      <ContentWrapper>
        <div className="row">
          <div className="col">
            <Fade delay={30}>N</Fade>
          </div>
          <div className="col">
            <Fade delay={60}>E</Fade>
          </div>
          <div className="col">
            <Fade delay={90}>W</Fade>
          </div>
          <div className="col">
            <Fade delay={90}>S</Fade>
          </div>
        </div>
        <NewsWrapper>
          {newsData.map((item) => (
            <NewsItem key={`news_key${item.id}`}>
              <Fade bottom delay={60 * item.id}>
                <Heading as="h3" content={item.title} />
                <Text content={item.excerpt} />
                <Link href={item.link_url}>
                  <a className="read_more__btn">
                    <span className="arrow"></span>
                    <span className="text">{item.link_text}</span>
                  </a>
                </Link>
              </Fade>
            </NewsItem>
          ))}
        </NewsWrapper>
      </ContentWrapper>
    </SectionWrapper>
  );
};

export default News;

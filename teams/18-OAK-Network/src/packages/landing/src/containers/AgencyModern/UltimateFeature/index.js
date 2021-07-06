import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/feather/chevronRight';
import Box from 'common/components/Box';

import FeatureBlock from 'common/components/FeatureBlock';
import Container from 'common/components/UI/ContainerTwo';
import Text from 'common/components/Text';
import Link from 'common/components/Link';
import Heading from 'common/components/Heading';
import SectionWrapper, {
  SectionTitle,
  FeatureWrapper,
} from './ultimateFeature.style';
import data from 'common/data/AgencyModern';

const UltimateFeature = () => {
  return (
    <SectionWrapper id="features">
      <Container>
        <SectionTitle>
          <Heading content="Ultimate features you must appreciate" />
          <Text content="Focus only on the meaning, we take care of the design. As soon as the meeting end you can export in one click into your preferred." />
        </SectionTitle>

        <FeatureWrapper>
          {data.features.map((feature, index) => (
            <FeatureBlock
              key={index}
              icon={<img src={feature.icon} alt="ah" />}
              title={<Heading as="h4" content={feature.title} />}
              description={
                <React.Fragment>
                  <Text content={feature.desc} />
                  <Link href="#" className="learn__more">
                    Learn More <Icon icon={chevronRight} />
                  </Link>
                </React.Fragment>
              }
              className="ultimateFeature"
            />
          ))}
        </FeatureWrapper>
      </Container>
    </SectionWrapper>
  );
};

UltimateFeature.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
};

UltimateFeature.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: ['-30px', '-30px', '-30px', '-25px', '-30px'],
    mr: ['-30px', '-30px', '-30px', '-25px', '-45px'],
  },
  col: {
    width: [1, 1 / 2, 1 / 2, 1 / 3],
  },
};

export default UltimateFeature;

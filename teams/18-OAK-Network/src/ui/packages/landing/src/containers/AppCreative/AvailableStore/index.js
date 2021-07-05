import React from 'react';
import Fade from 'react-reveal/Fade';
import Text from 'common/components/Text';
import Image from 'common/components/Image';
import Input from 'common/components/Input';
import Select from 'common/components/Select';
import Button from 'common/components/Button';
import Heading from 'common/components/Heading';
import Container from 'common/components/UI/Container';
import BarCode from 'common/assets/image/appCreative/bar-code.png';
import SectionWrapper, {
  ThumbWrapper,
  TextWrapper,
  Subscribe,
  SubscribeField,
  BarCodeArea,
} from './availableStore.style';

import { availableStore } from 'common/data/AppCreative';

const AvailableStore = () => {
  const { title, description, thumb, numberPrefix } = availableStore;
  return (
    <SectionWrapper>
      <Container>
        <TextWrapper>
          <Heading content={title} />
          <Text content={description} />
          <Subscribe>
            <SubscribeField>
              <Select
                options={numberPrefix}
                placeholder="+14"
                className="phone_search_select"
                aria-label="select options"
              />
              <Input
                inputType="text"
                placeholder="Phone Number"
                iconPosition="left"
                aria-label="number"
              />
            </SubscribeField>
            <Button title="Send" type="submit" />
          </Subscribe>
          <BarCodeArea>
            <Button
              className="bar__code"
              variant="textButton"
              icon={<Image src={BarCode} alt="Scan" />}
              iconPosition="left"
              title="Scan to download"
            />
          </BarCodeArea>
        </TextWrapper>
        <ThumbWrapper>
          <Fade right>
            <Image src={thumb} alt="App Image" />
          </Fade>
        </ThumbWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default AvailableStore;

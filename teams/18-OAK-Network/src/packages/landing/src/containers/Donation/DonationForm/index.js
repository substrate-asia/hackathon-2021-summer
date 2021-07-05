import React, { useState } from 'react';
import Tabs, { TabPane } from 'rc-tabs';
// import TabContent from 'rc-tabs/lib/TabContent';
// import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import Text from 'common/components/Text';
import Input from 'common/components/Input';
import Image from 'common/components/Image';
import Button from 'common/components/Button';
import Heading from 'common/components/Heading';
import Checkbox from 'common/components/Checkbox';
// import Image from 'common/components/Image';
import Radio from './Radio';
import CustomRadio from '../CustomRadio';
import Container from 'common/components/UI/Container';
import TabTitle from './TabTitle';
import {
  Section,
  Illustration,
  DonationFormWrapper,
  DonationForm,
  DonationCycle,
  PresetAmount,
  FormPart,
  CardInfo,
} from './donationForm.style';
import gpay from 'common/assets/image/donation/gpay.png';

import { data } from 'common/data/Donation';

const DonationFormSection = () => {
  const [presetAmount, setPresetAmount] = useState(20);
  const [donationPeriod, setDonationPeriod] = useState('monthly');

  const handleDonationAmount = (e) => {
    setPresetAmount(Number(e.target.value));
  };

  const handleDonationPeriod = (period) => {
    setDonationPeriod(period);
  };

  return (
    <Section id="donation">
      <Container>
        <DonationFormWrapper>
          <Illustration>
            <Heading content="More than 10M people donating to help patients" />
            <Text content="The World Health Organization is leading and coordinating the global effort, supporting countries to prevent, detect, and respond to the pandemic." />
          </Illustration>
          <Tabs
          // renderTabBar={() => <ScrollableInkTabBar />}
          // renderTabContent={() => <TabContent animated={false} />}
          >
            <TabPane tab={<TabTitle step="01" title="Select amount" />} key="1">
              <DonationForm>
                <DonationCycle>
                  <Radio
                    id="onetime"
                    value="onetime"
                    label="Donate onetime"
                    isChecked={donationPeriod === 'onetime'}
                    handleClick={() => handleDonationPeriod('onetime')}
                  />
                  <Radio
                    id="monthly"
                    value="monthly"
                    label="Every Month"
                    isChecked={donationPeriod === 'monthly'}
                    handleClick={() => handleDonationPeriod('monthly')}
                  />
                </DonationCycle>
                <PresetAmount>
                  {data?.presetAmounts?.map((preset) => (
                    <CustomRadio
                      key={preset.id}
                      label={preset.label}
                      value={preset.value}
                      isChecked={presetAmount === preset.value}
                      handleClick={handleDonationAmount}
                    />
                  ))}
                </PresetAmount>
                <Input
                  icon={<>$</>}
                  type="number"
                  iconPosition="right"
                  className="other-amount"
                  placeholder="Other Amount"
                />
                <Checkbox
                  value="remember_me"
                  className="remember_me"
                  labelText="Want to join with donation community"
                />
                <Button title="Donate Now" className="donate-now" />
                <span className="or-separator">or</span>
                <Button
                  icon={<Image src={gpay} alt="google pay" />}
                  iconPosition="left"
                  title="Donate with Google Pay"
                  className="pay-with-google"
                />
              </DonationForm>
            </TabPane>
            <TabPane tab={<TabTitle step="02" title="About you" />} key="2">
              <FormPart>
                <div className="two-col">
                  <Input
                    type="text"
                    label="First Name"
                    className="input-field"
                    placeholder="Ragavender"
                  />
                  <Input
                    type="text"
                    label="Last Name"
                    className="input-field"
                    placeholder="Rao Jitta"
                  />
                </div>
                <Input
                  type="email"
                  label="Email address"
                  className="input-field"
                  placeholder="example@yahoo.com"
                />
                <Input
                  type="text"
                  className="input-field"
                  label="Address (optional)"
                  placeholder="Where you from"
                />

                <Button title="Next Step" />
              </FormPart>
            </TabPane>
            <TabPane
              tab={<TabTitle step="03" title="Finish Payment" />}
              key="3"
            >
              <CardInfo>
                <Input
                  type="text"
                  label="Card Holder Name"
                  className="input-field"
                  placeholder="Ragavender Rao Jitta"
                />
                <Input
                  type="text"
                  label="Card Number"
                  className="input-field"
                  placeholder="012 3456 7890"
                />
                <div className="two-col">
                  <Input
                    type="text"
                    label="Expired Date"
                    placeholder="MM/YYYY"
                    className="input-field"
                  />
                  <Input
                    label="CVC"
                    type="text"
                    placeholder="495"
                    className="input-field"
                  />
                </div>
                <Button title="Finish Payment" />
              </CardInfo>
            </TabPane>
          </Tabs>
        </DonationFormWrapper>
      </Container>
    </Section>
  );
};

export default DonationFormSection;

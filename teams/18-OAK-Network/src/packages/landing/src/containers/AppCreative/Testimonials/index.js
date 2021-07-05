import React from 'react';
import Link from 'next/link';
import { Icon } from 'react-icons-kit';
import { twitter } from 'react-icons-kit/icomoon/twitter';
import Masonry from 'react-masonry-component';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Image from 'common/components/Image';
import Container from 'common/components/UI/Container';
import { SectionHeader } from '../appCreative.style';
import SectionWrapper, {
  TestimonialWrapper,
  TestimonialItem,
  TestimonialItemInner,
  TestimonialHead,
  AuthorImage,
} from './testimonial.style';
import { testimonial } from 'common/data/AppCreative';

const masonryOptions = {
  originTop: true,
};

const TestimonialSection = () => {
  const { slogan, title, reviews } = testimonial;
  return (
    <SectionWrapper id="testimonial">
      <Container>
        <SectionHeader>
          <Heading content={title} />
          <Text content={slogan} />
        </SectionHeader>
        <TestimonialWrapper>
          <Masonry className="masonryGrid" options={masonryOptions}>
            {reviews.map((item) => (
              <TestimonialItem key={`testimonial-item-${item.id}`}>
                <TestimonialItemInner>
                  <TestimonialHead>
                    <AuthorImage>
                      <Image src={item.avatar} alt={item.name} />
                    </AuthorImage>
                    <Box>
                      <Heading as="h3" content={item.name} />
                      <Text content={item.designation} />
                    </Box>
                    <Link href="#">
                      <a aria-label="twitter">
                        <Icon icon={twitter} size={24} />
                      </a>
                    </Link>
                  </TestimonialHead>
                  <Text content={item.description} />
                </TestimonialItemInner>
              </TestimonialItem>
            ))}
          </Masonry>
        </TestimonialWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default TestimonialSection;

import React from 'react';
import Swiper from 'react-id-swiper';
import Container from 'common/components/UI/ContainerTwo';
import Heading from 'common/components/Heading';
import Image from 'common/components/Image';
import SectionWrapper, {
  Content,
  Testimonial,
  Figure,
  Caption,
  CustomBullet,
} from './testimonials.style';
import { testimonials } from 'common/data/HostingModern';
const settings = {
  effect: 'fade',
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: (index, className) => {
      return `<button class="${className} swiper-custom-pagination"></button>`;
    },
  },
};

const Testimonials = () => {
  return (
    <SectionWrapper id="testimonials">
      <Container>
        <Content>
          <Swiper className="slider" {...settings}>
            {testimonials.map((testimonial) => (
              <Testimonial key={testimonial.id}>
                <Figure>
                  <Image src={testimonial.image} alt={testimonial.name} />
                </Figure>
                <Caption>
                  <Heading content={testimonial.quote} />
                  <p>
                    <strong>{testimonial.name}</strong>,{' '}
                    {testimonial.designation}
                  </p>
                </Caption>
              </Testimonial>
            ))}
          </Swiper>
        </Content>
      </Container>
    </SectionWrapper>
  );
};

export default Testimonials;
